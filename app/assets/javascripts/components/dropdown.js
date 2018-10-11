// reference from A/a dropdown.js readings

//dropdown function that removes "hidden" class from dropdown
//while adding hideDropdown listener to document and clearing
//up out-of-date listener

const revealDropdown = (event) => {
  event.stopPropagation(); //prevent from being picked up by body
  $('#user-dropdown').removeClass('hidden');
  $('#user-dropdown-btn').off('click', revealDropdown);
  $(document).on('click', hideDropdown);
};


const hideDropdown = () => {
  $('#user-dropdown').addClass('hidden');
  $('#user-dropdown-btn').on('click', revealDropdown);
  $(document).off('click', hideDropdown);
};





//Add click listener to user icon which invokes reveal drop down function
$(() => $('#user-dropdown-btn').on('click', revealDropdown));
