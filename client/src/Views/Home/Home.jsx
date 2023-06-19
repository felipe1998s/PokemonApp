import CardsConteiner from "../../Components/CardsConteiner/CardsConteiner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByTypes, getPokemons } from "../../redux/actions";
import style from "./Home.module.css";
import FilterConteiner from "../../Components/FiltersConteiner/FiltersConteiner";
import Loading from "../../Components/Loading/Loading";
import NavBar from "../../Components/NavBar/NavBar";


export const Home = () => {
    
    const dispatch = useDispatch();
    const pokemonsAll = useSelector((state)=>state.pokemons);


    useEffect(()=>{
        dispatch(getPokemons());
        dispatch(getPokemonByTypes());
    },[dispatch]);


    return (
        <div className={style.Conteiner}>
            {!pokemonsAll.length?(<div className={style.Loading}><Loading></Loading></div> ):(
                    <div>
                        <NavBar/>
                        <hr />
                        <FilterConteiner/>
                        <CardsConteiner/>
                    </div>   
            )} 
        </div>
    )
}