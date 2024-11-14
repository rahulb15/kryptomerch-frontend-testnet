import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import dynamic from 'next/dynamic';
import { ImageType } from "@utils/types";

const TVChartAdvanceContainer = dynamic(
  () => import("@components/TVChartAdvanceContainer"),
  { ssr: false }
);

const defaultWidgetProps = {
  interval: "D",
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "nft_trading_view",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const HeroArea = ({ data }) => {
  console.log("HeroArea", data);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
console.log(data.data, "data");
  if (!data || !data.data.data._id || !data.data.data.collectionName) {
    console.log("No collection data found");
    return <div>Loading collection data...</div>;
  }

  const widgetProps = {
    ...defaultWidgetProps,
    symbol: `KRYPTOMERCH:${data.data.data.collectionName}`,
    collectionId: data.data.data._id,
    collectionName: data.data.data.collectionName,
  };

  console.log("widgetProps", widgetProps);

  return (
    <div className="rn-banner-area">
      {isClient && <TVChartAdvanceContainer {...widgetProps} />}
    </div>
  );
};

HeroArea.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: ImageType,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        image: ImageType.isRequired,
      })
    ),
    bitCount: PropTypes.number,
    collectionBannerImage: PropTypes.string,
    collectionCoverImage: PropTypes.string,
    creator: PropTypes.string,
    size: PropTypes.string,
    totalSupply: PropTypes.number,
  }),
};

export default HeroArea;