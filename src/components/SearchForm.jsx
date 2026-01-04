import './SearchForm.css';
import React from "react";
import { DropdownList, NumberPicker, DatePicker } from "react-widgets";
import "react-widgets/styles.css";

function SearchForm({ criteria, setCriteria, onSearch }) {
  const propertyTypes = ["Any", "House", "Flat"];
  const postcodeOptions = ["Any", "BR3", "BR5", "BR6", "CR0", "DA1", "SE10", "TN13"];
  const bedroomOptions = ["Any", 1, 2, 3, 4, 5, 6];

  return (
    <div className="search-form">
      <h3>Find Your Property</h3>

      <label>
        Property Type
        <DropdownList
          data={propertyTypes}
          value={criteria.type || "Any"}
          onChange={(value) =>
            setCriteria({ ...criteria, type: value === "Any" ? "" : value })
          }
        />
      </label>

      <label>
        Min Price
        <NumberPicker
          value={criteria.minPrice || null}
          min={0}
          onChange={(value) => setCriteria({ ...criteria, minPrice: value })}
        />
      </label>

      <label>
        Max Price
        <NumberPicker
          value={criteria.maxPrice || null}
          min={0}
          onChange={(value) => setCriteria({ ...criteria, maxPrice: value })}
        />
      </label>

      <label>
        Min Bedrooms
        <DropdownList
          data={bedroomOptions}
          value={criteria.minBeds || "Any"}
          onChange={(value) =>
            setCriteria({ ...criteria, minBeds: value === "Any" ? "" : value })
          }
        />
      </label>

      <label>
        Max Bedrooms
        <DropdownList
          data={bedroomOptions}
          value={criteria.maxBeds || "Any"}
          onChange={(value) =>
            setCriteria({ ...criteria, maxBeds: value === "Any" ? "" : value })
          }
        />
      </label>

      <label>
        Date Added - From
        <DatePicker
          value={criteria.dateFrom || null}
          onChange={(value) => setCriteria({ ...criteria, dateFrom: value })}
        />
      </label>

      <label>
        Date Added - To
        <DatePicker
          value={criteria.dateTo || null}
          onChange={(value) => setCriteria({ ...criteria, dateTo: value })}
        />
      </label>

      <label>
        Postcode Area
        <DropdownList
          data={postcodeOptions}
          value={criteria.postcode || "Any"}
          onChange={(value) =>
            setCriteria({ ...criteria, postcode: value === "Any" ? "" : value })
          }
        />
      </label>

      
      <button
        type="button"
        onClick={onSearch}                          
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchForm;
