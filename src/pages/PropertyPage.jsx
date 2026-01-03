import React from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage() {
  const { id } = useParams();

  const property = propertiesData.properties.find(
    (p) => p.id.toString() === id
  );

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="property-page">
      <h2>{property.type}</h2>
      <p className="price">£{property.price.toLocaleString()}</p>
      <p className="location">{property.location}</p>

      {/* 🔹 Main Image */}
      <div className="main-image">
        <img src={property.picture} alt="Main property" />
      </div>

      {/* 🔹 Thumbnails */}
      <div className="thumbnails">
        {property.images.map((img, index) => (
          <img key={index} src={img} alt="thumbnail" />
        ))}
      </div>

      {/* 🔹 Tabs */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            src={property.floorPlan}
            alt="Floor Plan"
            className="floor-plan"
          />
        </TabPanel>

        <TabPanel>
          <iframe
            title="map"
            src={property.map}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;
