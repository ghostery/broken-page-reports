FROM node:24.22.1-bookworm-slim

RUN mkdir -p /.npm && chmod a+rw -R /.npm

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
