# FROM node:20.16.0-alpine3.20

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci

# COPY . .

# # Define build arguments
# ARG NEXT_PUBLIC_PROJECT_ID
# ARG NEXT_PUBLIC_RELAY_URL
# ARG NEXT_PUBLIC_KDA_NETWORK_TYPE
# ARG NEXT_PUBLIC_KDA_CHAIN_ID
# ARG NEXT_PUBLIC_KDA_GAS_PRICE
# ARG NEXT_PUBLIC_KDA_GAS_LIMIT
# ARG NEXT_PUBLIC_KDA_PRECISION
# ARG NEXT_PUBLIC_KDA_NETWORK_ID
# ARG NEXT_PUBLIC_KDA_FEE
# ARG NEXT_PUBLIC_APR_FEE
# ARG NEXT_PUBLIC_KDA_NETWORK
# ARG NEXT_PUBLIC_BASE_URL
# ARG NEXT_PUBLIC_ZELCORE_URL
# ARG NEXT_PUBLIC_ADMIN_ADDRESS
# ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ARG NEXT_PUBLIC_FRONTEND_URL
# ARG NEXT_PUBLIC_LAUNCHPAD_CHARGES
# ARG NEXT_PUBLIC_DEFAULT_INSTANCE


# # Set environment variables
# ENV NEXT_PUBLIC_PROJECT_ID=$NEXT_PUBLIC_PROJECT_ID \
#     NEXT_PUBLIC_RELAY_URL=$NEXT_PUBLIC_RELAY_URL \
#     NEXT_PUBLIC_KDA_NETWORK_TYPE=$NEXT_PUBLIC_KDA_NETWORK_TYPE \
#     NEXT_PUBLIC_KDA_CHAIN_ID=$NEXT_PUBLIC_KDA_CHAIN_ID \
#     NEXT_PUBLIC_KDA_GAS_PRICE=$NEXT_PUBLIC_KDA_GAS_PRICE \
#     NEXT_PUBLIC_KDA_GAS_LIMIT=$NEXT_PUBLIC_KDA_GAS_LIMIT \
#     NEXT_PUBLIC_KDA_PRECISION=$NEXT_PUBLIC_KDA_PRECISION \
#     NEXT_PUBLIC_KDA_NETWORK_ID=$NEXT_PUBLIC_KDA_NETWORK_ID \
#     NEXT_PUBLIC_KDA_FEE=$NEXT_PUBLIC_KDA_FEE \
#     NEXT_PUBLIC_APR_FEE=$NEXT_PUBLIC_APR_FEE \
#     NEXT_PUBLIC_KDA_NETWORK=$NEXT_PUBLIC_KDA_NETWORK \
#     NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
#     NEXT_PUBLIC_ZELCORE_URL=$NEXT_PUBLIC_ZELCORE_URL \
#     NEXT_PUBLIC_ADMIN_ADDRESS=$NEXT_PUBLIC_ADMIN_ADDRESS \
#     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY \
#     NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL \
#     NEXT_PUBLIC_LAUNCHPAD_CHARGES=$NEXT_PUBLIC_LAUNCHPAD_CHARGES \
#     NEXT_PUBLIC_DEFAULT_INSTANCE=$NEXT_PUBLIC_DEFAULT_INSTANCE

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]


FROM node:20.16.0-alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Define build arguments
ARG NEXT_PUBLIC_PROJECT_ID
ARG NEXT_PUBLIC_RELAY_URL
ARG NEXT_PUBLIC_KDA_NETWORK_TYPE
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_ZELCORE_URL
ARG NEXT_PUBLIC_ADMIN_ADDRESS
ARG NEXT_PUBLIC_FRONTEND_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_LAUNCHPAD_CHARGES
ARG NEXT_PUBLIC_WALLETCONNECT_BRIDGE_URL
ARG NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID
ARG NEXT_PUBLIC_TESTNET_CHAIN_ID
ARG NEXT_PUBLIC_TESTNET_CHAIN_NAME
ARG NEXT_PUBLIC_TESTNET_CHAIN_NETWORK_ID
ARG NEXT_PUBLIC_TESTNET_CHAIN_NETWORK
ARG NEXT_PUBLIC_TESTNET_CHAIN_GAS_PRICE
ARG NEXT_PUBLIC_TESTNET_CHAIN_GAS_LIMIT
ARG NEXT_PUBLIC_TESTNET_CHAIN_FEE
ARG NEXT_PUBLIC_TESTNET_CHAIN_PRECISION
ARG NEXT_PUBLIC_TESTNET_CHAIN_APR_FEE
ARG NEXT_PUBLIC_TESTNET_CHAIN_VERSION
ARG NEXT_PUBLIC_TESTNET_DEFAULT_INSTANCE
ARG NEXT_PUBLIC_TESTNET_WALLETCONNECT_CHAIN_ID
ARG NEXT_PUBLIC_MAINNET_CHAIN_ID
ARG NEXT_PUBLIC_MAINNET_CHAIN_NAME
ARG NEXT_PUBLIC_MAINNET_CHAIN_NETWORK_ID
ARG NEXT_PUBLIC_MAINNET_CHAIN_NETWORK
ARG NEXT_PUBLIC_MAINNET_CHAIN_GAS_PRICE
ARG NEXT_PUBLIC_MAINNET_CHAIN_GAS_LIMIT
ARG NEXT_PUBLIC_MAINNET_CHAIN_FEE
ARG NEXT_PUBLIC_MAINNET_CHAIN_PRECISION
ARG NEXT_PUBLIC_MAINNET_CHAIN_APR_FEE
ARG NEXT_PUBLIC_MAINNET_CHAIN_VERSION
ARG NEXT_PUBLIC_MAINNET_DEFAULT_INSTANCE
ARG NEXT_PUBLIC_MAINNET_WALLETCONNECT_CHAIN_ID
ARG NEXT_PUBLIC_VERSION

# Set environment variables
ENV NEXT_PUBLIC_PROJECT_ID=$NEXT_PUBLIC_PROJECT_ID \
    NEXT_PUBLIC_RELAY_URL=$NEXT_PUBLIC_RELAY_URL \
    NEXT_PUBLIC_KDA_NETWORK_TYPE=$NEXT_PUBLIC_KDA_NETWORK_TYPE \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_ZELCORE_URL=$NEXT_PUBLIC_ZELCORE_URL \
    NEXT_PUBLIC_ADMIN_ADDRESS=$NEXT_PUBLIC_ADMIN_ADDRESS \
    NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL \
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY \
    NEXT_PUBLIC_LAUNCHPAD_CHARGES=$NEXT_PUBLIC_LAUNCHPAD_CHARGES \
    NEXT_PUBLIC_WALLETCONNECT_BRIDGE_URL=$NEXT_PUBLIC_WALLETCONNECT_BRIDGE_URL \
    NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID=$NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID \
    NEXT_PUBLIC_TESTNET_CHAIN_ID=$NEXT_PUBLIC_TESTNET_CHAIN_ID \
    NEXT_PUBLIC_TESTNET_CHAIN_NAME=$NEXT_PUBLIC_TESTNET_CHAIN_NAME \
    NEXT_PUBLIC_TESTNET_CHAIN_NETWORK_ID=$NEXT_PUBLIC_TESTNET_CHAIN_NETWORK_ID \
    NEXT_PUBLIC_TESTNET_CHAIN_NETWORK=$NEXT_PUBLIC_TESTNET_CHAIN_NETWORK \
    NEXT_PUBLIC_TESTNET_CHAIN_GAS_PRICE=$NEXT_PUBLIC_TESTNET_CHAIN_GAS_PRICE \
    NEXT_PUBLIC_TESTNET_CHAIN_GAS_LIMIT=$NEXT_PUBLIC_TESTNET_CHAIN_GAS_LIMIT \
    NEXT_PUBLIC_TESTNET_CHAIN_FEE=$NEXT_PUBLIC_TESTNET_CHAIN_FEE \
    NEXT_PUBLIC_TESTNET_CHAIN_PRECISION=$NEXT_PUBLIC_TESTNET_CHAIN_PRECISION \
    NEXT_PUBLIC_TESTNET_CHAIN_APR_FEE=$NEXT_PUBLIC_TESTNET_CHAIN_APR_FEE \
    NEXT_PUBLIC_TESTNET_CHAIN_VERSION=$NEXT_PUBLIC_TESTNET_CHAIN_VERSION \
    NEXT_PUBLIC_TESTNET_DEFAULT_INSTANCE=$NEXT_PUBLIC_TESTNET_DEFAULT_INSTANCE \
    NEXT_PUBLIC_TESTNET_WALLETCONNECT_CHAIN_ID=$NEXT_PUBLIC_TESTNET_WALLETCONNECT_CHAIN_ID \
    NEXT_PUBLIC_MAINNET_CHAIN_ID=$NEXT_PUBLIC_MAINNET_CHAIN_ID \
    NEXT_PUBLIC_MAINNET_CHAIN_NAME=$NEXT_PUBLIC_MAINNET_CHAIN_NAME \
    NEXT_PUBLIC_MAINNET_CHAIN_NETWORK_ID=$NEXT_PUBLIC_MAINNET_CHAIN_NETWORK_ID \
    NEXT_PUBLIC_MAINNET_CHAIN_NETWORK=$NEXT_PUBLIC_MAINNET_CHAIN_NETWORK \
    NEXT_PUBLIC_MAINNET_CHAIN_GAS_PRICE=$NEXT_PUBLIC_MAINNET_CHAIN_GAS_PRICE \
    NEXT_PUBLIC_MAINNET_CHAIN_GAS_LIMIT=$NEXT_PUBLIC_MAINNET_CHAIN_GAS_LIMIT \
    NEXT_PUBLIC_MAINNET_CHAIN_FEE=$NEXT_PUBLIC_MAINNET_CHAIN_FEE \
    NEXT_PUBLIC_MAINNET_CHAIN_PRECISION=$NEXT_PUBLIC_MAINNET_CHAIN_PRECISION \
    NEXT_PUBLIC_MAINNET_CHAIN_APR_FEE=$NEXT_PUBLIC_MAINNET_CHAIN_APR_FEE \
    NEXT_PUBLIC_MAINNET_CHAIN_VERSION=$NEXT_PUBLIC_MAINNET_CHAIN_VERSION \
    NEXT_PUBLIC_MAINNET_DEFAULT_INSTANCE=$NEXT_PUBLIC_MAINNET_DEFAULT_INSTANCE \
    NEXT_PUBLIC_MAINNET_WALLETCONNECT_CHAIN_ID=$NEXT_PUBLIC_MAINNET_WALLETCONNECT_CHAIN_ID \
    NEXT_PUBLIC_VERSION=$NEXT_PUBLIC_VERSION


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
