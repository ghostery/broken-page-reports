import { Octokit } from "npm:octokit";
import { parse } from "npm:tldts";
import * as path from "jsr:@std/path";

import { Action, Config, isAction, isPlatform, Platform } from "./types.ts";
import flags from "./flags.ts";

const config: Config = {
  domains: {},
  flags,
};

const octokit = new Octokit();

const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: "ghostery",
  repo: "broken-page-reports",
  per_page: 100,
});

for await (const { data: issues } of iterator) {
  for (const issue of issues) {
    const actions = new Set<Action>();
    const platforms = new Set<Platform>();

    for (const label of issue.labels) {
      const labelName = typeof label === "string" ? label : label.name;

      if (labelName === undefined) {
        continue;
      }

      if (labelName.startsWith("action/")) {
        const action = labelName.split("action/")[1];
        if (isAction(action)) {
          actions.add(action);
        } else {
          console.warn(`Unknown action: ${action} - ${issue.html_url}`);
        }
      }

      if (labelName.startsWith("platform/")) {
        const platform = labelName.split("platform/")[1];
        if (isPlatform(platform)) {
          platforms.add(platform);
        } else {
          console.warn(`Unknown platform: ${platform} - ${issue.html_url}`);
        }
      }
    }

    if (actions.size === 0) {
      continue;
    }

    const { hostname, isIcann } = parse(issue.title);

    if (!isIcann) {
      console.warn(
        `Invalid domain name for issue: ${issue.title} - ${issue.html_url}`,
      );
      continue;
    }

    if (!hostname) {
      console.warn(`Invalid issue name: ${issue.title} - ${issue.html_url}`);
      continue;
    }

    config.domains[hostname] = {
      issueUrl: issue.html_url,
      actions: Array.from(actions),
    };

    if (platforms.size > 0) {
      config.domains[hostname].filter = {
        platform: Array.from(platforms),
      };
    }
  }
}

const configPath = path.join(import.meta.dirname!, "..", "..", "config");
await Deno.mkdir(configPath, { recursive: true });
await Deno.writeTextFile(
  path.join(configPath, "v1.json"),
  JSON.stringify(config, null, 2),
);

Deno.exit(0);
