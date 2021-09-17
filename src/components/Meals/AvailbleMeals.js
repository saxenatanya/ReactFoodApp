import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {
    const [meals,setMeals] = useState([]);
const [isLoading,setIsLoading] = useState(true);
const [httpError,setHttpError] = useState(false);
    useEffect(()=>{ 
        const fetchedData = async () => {
            const response = await fetch('https://react-http-37bac-default-rtdb.firebaseio.com/meals.json');
            const data = await response.json();
        console.log(data +"data");
            const loadedMeals = [];

            if(!response.ok){
                throw new Error("something went wrong");
            }
        
            for (const key in data) {
                loadedMeals.push({
                    // key:key,
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }
            setMeals(loadedMeals);
            console.log(loadedMeals);

        }
             fetchedData().catch((error)=>{
                 setIsLoading(false);
                 setHttpError(error.message);
             });
    },[]);
    const mealsList = meals.map(meal => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    ));
    return <section className={classes.meals}>
        <ul>
            <Card>
                {!isLoading ? <ul>{mealsList}</ul>:<p><center>Loading...</center></p> }
               {/* {httpError === ''<p><center> Error while fecthing</center></p>  } */}
            </Card>
        </ul>
    </section>
};

export default AvailableMeals;