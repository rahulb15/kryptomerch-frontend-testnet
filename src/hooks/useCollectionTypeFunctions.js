// // src/hooks/useCollectionTypeFunctions.js

// import { useCallback } from 'react';
// import {
//   useCheckPublicMutation,
//   useCheckPublicPriceMutation,
//   useReserveTokensMutation,
// } from "../services/launchpad.service";
// import {
//   useCheckMarketPublicMutation,
//   useCheckMarketPublicPriceMutation,
//   useMarketReserveTokensMutation,
// } from "../services/marketplace.service";

// export const useCollectionTypeFunctions = (collectionType) => {
//   const [checkPublic] = useCheckPublicMutation();
//   const [checkPublicPrice] = useCheckPublicPriceMutation();
//   const [reserveTokens] = useReserveTokensMutation();

//   const [checkMarketPublic] = useCheckMarketPublicMutation();
//   const [checkMarketPublicPrice] = useCheckMarketPublicPriceMutation();
//   const [marketReserveTokens] = useMarketReserveTokensMutation();

//   const checkIsPublic = useCallback(async (colName) => {
//     if (collectionType === 'marketplace') {
//       return checkMarketPublic({ colName });
//     } else {
//       return checkPublic({ colName });
//     }
//   }, [collectionType, checkMarketPublic, checkPublic]);

//   const checkPrice = useCallback(async (colName) => {
//     if (collectionType === 'marketplace') {
//       return checkMarketPublicPrice({ colName });
//     } else {
//       return checkPublicPrice({ colName });
//     }
//   }, [collectionType, checkMarketPublicPrice, checkPublicPrice]);

//   const reserveTokensFunction = useCallback(async (args) => {
//     if (collectionType === 'marketplace') {
//       return marketReserveTokens(args);
//     } else {
//       return reserveTokens(args);
//     }
//   }, [collectionType, marketReserveTokens, reserveTokens]);

//   return {
//     checkIsPublic,
//     checkPrice,
//     reserveTokensFunction
//   };
// };


import { useCallback } from 'react';
import {
  useCheckPublicMutation,
  useCheckWlMutation,
  useCheckPresaleMutation,
  useCheckPublicPriceMutation,
  useCheckWlPriceMutation,
  useCheckPresalePriceMutation,
  useReserveTokensMutation,
} from "../services/launchpad.service";
import {
  useCheckMarketPublicMutation,
  useCheckMarketWlMutation,
  useCheckMarketPresaleMutation,
  useCheckMarketPublicPriceMutation,
  useCheckMarketWlPriceMutation,
  useCheckMarketPresalePriceMutation,
  useMarketReserveTokensMutation,
} from "../services/marketplace.service";

export const useCollectionTypeFunctions = (collectionType) => {
  // Launchpad mutations
  const [checkPublic] = useCheckPublicMutation();
  const [checkWl] = useCheckWlMutation();
  const [checkPresale] = useCheckPresaleMutation();
  const [checkPublicPrice] = useCheckPublicPriceMutation();
  const [checkWlPrice] = useCheckWlPriceMutation();
  const [checkPresalePrice] = useCheckPresalePriceMutation();
  const [reserveTokens] = useReserveTokensMutation();

  // Marketplace mutations
  const [checkMarketPublic] = useCheckMarketPublicMutation();
  const [checkMarketWl] = useCheckMarketWlMutation();
  const [checkMarketPresale] = useCheckMarketPresaleMutation();
  const [checkMarketPublicPrice] = useCheckMarketPublicPriceMutation();
  const [checkMarketWlPrice] = useCheckMarketWlPriceMutation();
  const [checkMarketPresalePrice] = useCheckMarketPresalePriceMutation();
  const [reserveMarketTokens] = useMarketReserveTokensMutation();

  const checkIsPublic = useCallback((colName) => {
    return collectionType === 'marketplace' 
      ? checkMarketPublic({ colName }) 
      : checkPublic({ colName });
  }, [collectionType, checkMarketPublic, checkPublic]);

  const checkIsWhitelist = useCallback((colName) => {
    return collectionType === 'marketplace'
      ? checkMarketWl({ colName })
      : checkWl({ colName });
  }, [collectionType, checkMarketWl, checkWl]);

  const checkIsPresale = useCallback((colName) => {
    return collectionType === 'marketplace'
      ? checkMarketPresale({ colName })
      : checkPresale({ colName });
  }, [collectionType, checkMarketPresale, checkPresale]);

  const checkPrice = useCallback((colName, saleType) => {
    if (collectionType === 'marketplace') {
      switch(saleType) {
        case 'public':
          return checkMarketPublicPrice({ colName });
        case 'whitelist':
          return checkMarketWlPrice({ colName });
        case 'presale':
          return checkMarketPresalePrice({ colName });
        default:
          throw new Error('Invalid sale type');
      }
    } else {
      switch(saleType) {
        case 'public':
          return checkPublicPrice({ colName });
        case 'whitelist':
          return checkWlPrice({ colName });
        case 'presale':
          return checkPresalePrice({ colName });
        default:
          throw new Error('Invalid sale type');
      }
    }
  }, [collectionType, checkMarketPublicPrice, checkMarketWlPrice, checkMarketPresalePrice,
      checkPublicPrice, checkWlPrice, checkPresalePrice]);

  const reserveTokensFunction = useCallback((args) => {
    return collectionType === 'marketplace'
      ? reserveMarketTokens(args)
      : reserveTokens(args);
  }, [collectionType, reserveMarketTokens, reserveTokens]);

  return {
    checkIsPublic,
    checkIsWhitelist,
    checkIsPresale,
    checkPrice,
    reserveTokensFunction
  };
};