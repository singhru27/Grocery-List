Component Design:

My App is divided into several components/functions. The functionality of each is described below. 
App.js - This is where my App is launched from. I instantiate my main component (FilteredList) from this function. This Filtered List is encased in a top level Bootstrap container. 
FilteredList.js - This component creates instances of both the DisplayList and AggregateList components. In addition, this component class contains all of the functions that involve changing state in response to sorts, filters, and aggregation operations
DisplayList.js - This component is created by the FilteredList.js component. This component is simply responsible for creating cards for each grocery item, dependent upon the FilteredList state
AggregateList.js - This component is also created by the FilteredList.js component. This component is responsible for displaying the cards representing aggregated objects

Data Passing:
The data is passed in the following fashion. 
1. The App.js class creates the 12 possible grocery list items, and stores them in an array of objects. Each item has a name, price, category, shelf life, and image. This information is passed into the FilteredList component that is created within this component. 
2. The FilteredList class filters the array of objects that was passed into it by the App.js, and passes into the DisplayList component which renders the objects on the page. The FilteredList class also creates an object of items to be included in the Aggregated section of the page, and passes this to the AggregateList class to be displayed accordingly. 
3. The DisplayList class simply takes an array of objects that was passed in by the FilteredList class and displays it on the screen
4. The AggregateList component simply takes an object of sub-objects that was passed in by the FilteredList class and displays it on the screen

User Interaction/Change of State:
Below, the ways that the main user interaction features are handled are listed below. 
1. Filtering
The FilteredList class has a state object, which in turn has two keys called "shelf_life" and "type". These keys have corresponding values that correspond to the filtration that is to be applied on that attribute (i.e shelf_life may be short, medium or long). Whenever the user clicks the buttons on the top of the screen to change the filtration type, the state values are set accordingly. I then create a function that uses these state values to filter the list of Grocery Items passed in by the App.js as a prop to the FilteredList component. This filtered list of objects is then passed to the DisplayList class to be displayed. 
2. Sort
Similar to filtering, I also have a state variable that tracks whether the items should be sorted in ascending or descending order of price. The user can select this by clicking a button, which changes the state variable to whatever sort pattern that the user desires. Then, right before the list of filtered grocery items is passed to the DisplayList component to be rendered, I sort the items in whatever order the current state variable dictates. This mandates that the DisplayList displays the items in the desired order. 
3. Aggregation
In FilteredList, I have a state object called "aggregatedItems". The keys in this object consist of the different item names, and the values are again objects that contain the item price and quantity in cart. Within FilteredList, I have two functions that handle changing the aggregatedItems list. The addToCart increments the quantity for whatever food item is being added to the cart, while removeFromCart decrements the quantity. These functions are passed into the DisplayList component to be displayed along with the original item cards, to give users the option to add and remove items. This aggregatedItems list is then passed into the AggregateList component. The AggregateList component displays these items that are in the aggregatedList object, and sums up the total price for all the objects in the shopping cart as well. 