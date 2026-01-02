import { DateTimePicker, NumberPicker, DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

momentLocalizer(moment);

function SearchForm({ filters, setFilters }) {

  return (
    <form className="search-form">

      {/* Property Type */}
      <div>
        <label>Property Type</label>
        <DropdownList
          data={['House', 'Flat']}
          value={filters.type || null}
          onChange={val => setFilters({ ...filters, type: val })}
        />
      </div>

      {/* Min Price */}
      <div>
        <label>Min Price</label>
        <NumberPicker
          value={filters.minPrice || null}
          onChange={val => setFilters({ ...filters, minPrice: val })}
        />
      </div>

      {/* Max Price */}
      <div>
        <label>Max Price</label>
        <NumberPicker
          value={filters.maxPrice || null}
          onChange={val => setFilters({ ...filters, maxPrice: val })}
        />
      </div>

      {/* Min Bedrooms */}
      <div>
        <label>Min Bedrooms</label>
        <NumberPicker
          value={filters.minBeds || null}
          onChange={val => setFilters({ ...filters, minBeds: val })}
        />
      </div>

      {/* Max Bedrooms */}
      <div>
        <label>Max Bedrooms</label>
        <NumberPicker
          value={filters.maxBeds || null}
          onChange={val => setFilters({ ...filters, maxBeds: val })}
        />
      </div>

      {/* Date Added */}
      <div>
        <label>Date Added</label>
        <DateTimePicker
          value={filters.dateAdded || null}
          onChange={val => setFilters({ ...filters, dateAdded: val })}
        />
      </div>

      {/* Postcode Area */}
      <div>
        <label>Postcode Area</label>
        <DropdownList
          data={['CR0', 'BR6', 'BR3','BR5','TN13','SE10','DA1']} 
          value={filters.postcode || null}
          onChange={val => setFilters({ ...filters, postcode: val })}
        />
      </div>

    </form>
  );
}

export default SearchForm;
