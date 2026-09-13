# The image an agent's lane runs in: the reference lane image, rebuilt from
# public packages at the versions the reference runs had.
#
#   docker build -f docker/lane.Dockerfile -t building-bench-lane .
#
# The case, the kit and the agent's HOME are mounted at run time under /lane;
# nothing of the benchmark is baked in, so the grader's answer key is never on
# a path the agent can reach.
FROM python:3.12.13-slim

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
        git curl ca-certificates rsync libatomic1 \
    && rm -rf /var/lib/apt/lists/*

COPY docker/lane-requirements.txt /opt/lane-requirements.txt
RUN pip install --no-cache-dir -r /opt/lane-requirements.txt \
    && rm /opt/lane-requirements.txt

# The agent CLIs, pinned to what the reference runs used. Claude Code in the
# reference lanes was the operator's 2.1.257-2.1.261 mounted over the image's
# copy; 2.1.261 is the last of those.
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g @anthropic-ai/claude-code@2.1.261 @openai/codex@0.153.0 \
        opencode-ai@1.15.12 @google/gemini-cli@0.57.0 \
    && npm cache clean --force \
    && rm -rf /var/lib/apt/lists/*

# kimi-cli gets an environment of its own rather than resolving against the
# libraries above.
RUN python -m venv /opt/kimi \
    && /opt/kimi/bin/pip install --no-cache-dir kimi-cli==1.49.0 \
    && ln -s /opt/kimi/bin/kimi-cli /usr/local/bin/kimi-cli

RUN useradd --uid 10001 --create-home --home-dir /lane/home lane || true
RUN mkdir -p /lane/repo /lane/cache && chown -R 10001:10001 /lane

USER 10001
ENV HOME=/lane/home \
    PYTHONHASHSEED=0 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH=/usr/local/bin:/usr/bin:/bin
WORKDIR /lane/repo

RUN python -c "import numpy, PIL, scipy, shapely; print('lane image ready')"
CMD ["bash"]
