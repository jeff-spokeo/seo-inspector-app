FROM ubuntu:16.04

LABEL version="1.0" \
      maintainer="Jeff Mercado" \
      description="SEO Inspector App built off ubuntu"

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set environment variables
ENV HOME=/usr/src
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 7.6.0
ENV PORT 3000

# Run updates and install deps
RUN apt-get update
RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    libssl-dev \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    vim \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean    

# copy installation scripts
COPY scripts/ $HOME/scripts/

# install NODE/NPM
RUN bash $HOME/scripts/install_nvm.sh \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm i -g yarn

# Set up our PATH correctly so we don't have to long-reference npm, node, &c.
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# copy NPM package files
RUN mkdir -p $HOME/seo-inspector
WORKDIR $HOME/seo-inspector
COPY package.json yarn.lock $HOME/seo-inspector/

# install project dependencies
RUN yarn install 

# copy project source files
COPY . $HOME/seo-inspector/

EXPOSE $PORT

CMD ["node", "server.js"]
