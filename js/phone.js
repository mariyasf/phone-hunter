
const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;


    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}
const displayPhones = phones => {
    // console.log(phones)

    // Step 1: Select id
    const phoneContainer = document.getElementById('phone-container');

    // Clear phone container cards before adding new cards

    phoneContainer.textContent = '';

    // Show all buttom if there are more than 10 phones

    const showAllContainer = document.getElementById('showAllContainer');
    if (phones.length > 10) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display only 10
    phones = phones.slice(0, 10);



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
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        // Step 4: append child
        phoneContainer.appendChild(phoneCard);

    });
}

// Handle Search Btn
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchTxt = searchField.value;
    console.log(searchTxt);
    loadPhone(searchTxt);

}
// loadPhone();