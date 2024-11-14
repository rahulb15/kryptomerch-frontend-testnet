// data/support.js
export const supportCategories = [
    {
      id: 1,
      title: "Platform Basics",
      icon: "/icons/platform.svg",
      articleCount: 73,
      slug: "platform-basics"
    },
    {
      id: 2,
      title: "Transactions",
      icon: "/icons/transactions.svg", 
      articleCount: 37,
      slug: "transactions"
    },
    {
      id: 3,
      title: "Magic Eden Wallet",
      icon: "/icons/wallet.svg",
      articleCount: 85,
      slug: "wallet"
    },
    {
      id: 4,
      title: "Magic Eden Rewards",
      icon: "/icons/rewards.svg",
      articleCount: 10,
      slug: "rewards"
    },
    {
      id: 5,
      title: "Creator Resources",
      icon: "/icons/creator.svg",
      articleCount: 25,
      slug: "creator-resources"
    },
    {
      id: 6,
      title: "Partnerships",
      icon: "/icons/partnerships.svg",
      articleCount: 13,
      slug: "partnerships"
    },
    {
      id: 7,
      title: "Developer Tools",
      icon: "/icons/developer.svg",
      articleCount: 11,
      slug: "developer-tools",
      subCategories: [
        {
          title: "Magic Eden's API",
          articles: [
            {
              title: "Magic Eden API Guide: Harnessing the Power of Our Platform",
              slug: "api-guide"
            },
            {
              title: "The Magic Eden Solana API",
              slug: "solana-api"
            },
            {
              title: "The Magic Eden Ordinals API",
              slug: "ordinals-api"
            },
            {
              title: "The Magic Eden Polygon API",
              slug: "polygon-api"
            }
          ]
        },
        {
          title: "Other Guides and FAQ's",
          articles: [
            {
              title: "Determining Lucky Buy Results Using Solscan",
              slug: "lucky-buy-guide"
            },
            {
              title: "Listing Your Bitcoin Ordinals Collection on Magic Eden",
              slug: "listing-guide"
            }
          ]
        }
      ]
    },
    {
      id: 8,
      title: "Trust and Safety",
      icon: "/icons/safety.svg",
      articleCount: 27,
      slug: "trust-safety"
    }
  ];