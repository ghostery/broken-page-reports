import * as process from "node:process";
import { parse } from "npm:tldts";

// Convert decimal notation of ip address into 32 bit unsigned integer
function addr(decimalNotation: string): number {
  return (
    decimalNotation
      .split(".")
      .reduce(
        (state, part, index) =>
          state | (parseInt(part, 10) << ((3 - index) * 8)),
        0,
      ) >>> 0
  );
}

const title = process.argv.slice(2)[0];

if (/[A-Z]/.test(title)) {
  console.error("Given string includes an upper-case character!");
  process.exit(1);
}

const parsed = parse(title);

if (parsed.hostname === null) {
  console.error("Given string is not a valid domain name or IP address!");
  process.exit(1);
}

if (parsed.hostname !== title) {
  console.error("Given string is not a pure hostname!");
  process.exit(1);
}

if (parsed.isIp) {
  const ip = addr(title);

  // https://datatracker.ietf.org/doc/html/rfc1918#section-3
  if (
    (ip >= addr("10.0.0.0") && ip <= addr("10.255.255.255")) ||
    (ip >= addr("172.16.0.0") && ip <= addr("172.31.255.255")) ||
    (ip >= addr("192.168.0.0") && ip <= addr("192.168.255.255"))
  ) {
    console.error("IP address is not in the public address space!");
    process.exit(1);
  }
} else if (!parsed.isIcann) {
  console.error("TLD is not registered to ICANN list!");
  process.exit(1);
}
