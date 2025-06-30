FROM debian:12.8

COPY --from=denoland/deno:bin-2.3.7 /deno /usr/local/bin/deno
RUN mkdir -p /.cache/deno && chmod a+rw -R /.cache/deno

COPY --from=amazon/aws-cli:2.27.45 /usr/local/aws-cli/ /usr/local/aws-cli/
ENV PATH="/usr/local/aws-cli/v2/current/bin:${PATH}"

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install --yes --no-install-recommends \
      # required for curl
      ca-certificates \
      curl \
    && \
    rm -rf /var/lib/apt/lists/* && \
    rm -f /var/cache/apt/*.bin
