
const loadPhone = async (searchText, isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;


    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    // Step 1: Select id
    const phoneContainer = document.getElementById('phone-container');

    // Clear phone container cards before adding new cards

    phoneContainer.textContent = '';

    // Show all buttom if there are more than 12 phones

    const showAllContainer = document.getElementById('showAllContainer');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display only 12
    if (!isShowAll)
        phones = phones.slice(0, 12);



    phones.forEach(phone => {
        // console.log(phone);

        // Step 2: Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 p-4 bg-base-100 shadow-xl`;

        // Step 3: Set inner html
        phoneCard.innerHTML = `
            <figure>
             <img src="${phone.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he
                    choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        // Step 4: append child
        phoneContainer.appendChild(phoneCard);

    });
    // Hide loading spinner
    toggleLodingSpinner(false);
}

// Show detail
const handleShowDetails = async (id) => {
    console.log("yes");
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const phoneDetails = data.data;

    showPhoneDetails(phoneDetails);

}
const showPhoneDetails = (phoneDetails) => {
    console.log(phoneDetails);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phoneDetails.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img src="${phoneDetails.image}" alt="" />
        <p><span>Storage:</span>${phoneDetails?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phoneDetails.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phoneDetails.others?.GPS ? phoneDetails.others.GPS : 'No GPS available in this device'}</p>
    `

    // show the modal
    show_details_modal.showModal();
}
// Handle Search Btn
const handleSearch = (isShowAll) => {
    toggleLodingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    console.log(searchTxt);
    loadPhone(searchTxt, isShowAll);
}

const toggleLodingSpinner = (isLoadung) => {
    const loaderContainer = document.getElementById('loaderContainer');
    if (isLoadung)
        loaderContainer.classList.remove('hidden');
    else {
        loaderContainer.classList.add('hidden');
    }
}

const showAll = () => {
    handleSearch(true);
}
// loadPhone();