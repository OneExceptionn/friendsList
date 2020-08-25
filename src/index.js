const getFriends = async function() {
    try {
        const result = await fetch ('/api/friends');
        const data = await result.json();
        console.log(data)
        
        const friendsList = document.getElementById('friendsList')
        
        data.forEach(friend => {
            const linebreak = document.createElement('br');
            const linebreak2 = document.createElement('br');

            const newFriend = document.createElement('li')
            newFriend.className = 'friend'
            newFriend.innerText = friend.name

            const rating = document.createElement('div')
            rating.classList = 'rating'
            rating.innerText = friend.rating

            const Form = document.createElement('form')
            Form.setAttribute('method', 'POST')
            Form.setAttribute(`action`, `api/friends/${friend.id}?_method=PUT`)

            const addbutton = document.createElement('button')
            addbutton.setAttribute('name', 'buttonAction')
            addbutton.setAttribute('value', 'add')
            addbutton.innerText = '+'
            Form.append(addbutton)
            rating.append(Form)

            const subtractbutton = document.createElement('button')
            subtractbutton.innerText = '-'
            Form.append(subtractbutton)
            rating.append(Form)

            const deleteForm = document.createElement('form')
            deleteForm.setAttribute('method', 'POST')
            deleteForm.setAttribute(`action`, `api/friends/${friend.id}?_method=DELETE`)
            const deletebutton = document.createElement('button')
            deletebutton.innerText = 'x'
            deleteForm.append(deletebutton)
            rating.append(deleteForm)

            friendsList.append(newFriend, rating)
        })

    } catch (err) {
        console.log(err)
    }

}

getFriends()

// const getData = async function() {
//     try {
//     const result = await fetch ('/api');
//     const data = await result.json();

//     populateSelect(data, 'allHotels', 'hotels-choices');
//     populateSelect(data, 'allRestaurants', 'restaurants-choices');
//     populateSelect(data, 'allActivities', 'activities-choices');
//     console.log(data);

//     const hotelButton = document.getElementById('hotels-add');
//     hotelButton.addEventListener('click', function(event) {
//       buttonClick(data, 'allHotels', 'hotels-choices', 'hotels-list', 'hotels');
//     });

//     const restaurantsButton = document.getElementById('restaurants-add');
//     restaurantsButton.addEventListener('click', function(event) {
//       buttonClick(data, 'allRestaurants', 'restaurants-choices', 'restaurants-list', 'restaurants');
//     })

//     const activitiesButton = document.getElementById('activities-add');
//     activitiesButton.addEventListener('click', function(event) {
//       buttonClick(data, 'allActivities', 'activities-choices', 'activities-list', 'activities');
//     })

//     const itineraryLists = document.getElementById('itinerary');
//     itineraryLists.addEventListener('click', function(event){
//       if (event.target.tagName === 'LI'){
//         const parentList = event.target.parentElement;
//         const itemName = event.target.innerText;
//         const category = parentList.id.slice(0,-5);
//         console.log(category);
//         const categorySelect = document.getElementById(`${category}-choices`);
//         const reAddOption = document.createElement('option');
//         const optionId = event.target.value;
//         const coords = event.target.dataset.coords;
//         const markerToRemove = document.getElementById('map').querySelector(`div[data-coords="${coords}"]`)
//         const markerParent = markerToRemove.parentElement;
//         markerParent.removeChild(markerToRemove);
//         reAddOption.innerText = itemName;
//         reAddOption.setAttribute('value', optionId);
//         categorySelect.appendChild(reAddOption);
//         parentList.removeChild(event.target);
//       };
//     })

//   } catch (err) {
//     console.log(err)
//   }
// }