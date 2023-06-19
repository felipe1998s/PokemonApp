import React,{ useState } from "react";
// import axios from "axios";
import style from "./Form.module.css";
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import { createPokemon, getPokemonTypes } from "../../redux/actions";
import {Link} from "react-router-dom"
import {validate} from "../Form/funciones";

export const Form = () =>{

    //https://pokemon.fandom.com/es/wiki/Lista_de_Pok%C3%A9mon_con_sus_estad%C3%ADsticas_base

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const [arrayTypes,setArrayTypes]=useState([])
    const [form,setForm] =  useState({
        name:"",
        life:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        image:"",
        types:[]
    });
    const [errors,setErrors]=useState({});

    useEffect(()=>{
        dispatch(getPokemonTypes());
    },[dispatch]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setErrors(validate({...form,[property]:value}));
        setForm({...form,[property]:value});
    };

    const submitHandler = (event) =>{
        event.preventDefault();
        if(errors && (!(Object.values(errors).length===0))){
            return alert("¡Los datos no son validos!");
        }else if(Object.values(form).includes(" ") || (form.types.length===0)){
            return alert("¡Debe completar todos los datos!");
        }
        else{
            // axios.post("/pokemons",{...form,types:[...arr]})
            // .then(res=>alert("Creando pokemon",res));
            dispatch(createPokemon({...form,types:[...arr]}));
            alert(`creating ${form.name} pokemon`);
            setForm({
                name:"",
                life:"",
                attack:"",
                defense:"",
                speed:"",
                height:"",
                weight:"",
                image:"",
                types:[]
            })
        }
    }

    function filterTypes(e) {
        const name = e.target.name;
        setForm({...form,types:form.types.filter(type => type.name !== name)
        });
        setErrors(validate({...form,types:form.types.filter(type => type.name !== name)
        }));
        setArrayTypes(arrayTypes.filter((type)=>type !== name));
    }

    
    let arr = [];
    let arrNames = []
    const idType = (types,arrayTypes) =>{    
        for(let i=0;i < arrayTypes.length;i++){
            for(let j=0;j<types.length;j++){
                if(arrayTypes[i]===types[j].name){
                    arr.push(types[j].id);
                    arrNames.push(types[j].name);
                }
            }
        }
    };
    idType(types,arrayTypes);


    const handleSelect = (event) =>{
            const name = event.target.value;

            setForm({...form,types: [...form.types,{name}] });

            setErrors(validate({...form,types: [...form.types, {name}] }));

            setArrayTypes([...arrayTypes,name]);
    }

    return(
        <div className={style.Conteiner}>
            <div className={style.boxForm}>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>name: </label>
                        <input type="text" placeholder="name" value={form.name} onChange={changeHandler} name="name" autoComplete="off" />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <br />
                    <div>
                        <label>life: </label>
                        <input type="number" placeholder="life"  value={form.life} onChange={changeHandler} name="life" autoComplete="off" />
                        {errors.life && <p>{errors.life}</p>}
                    </div>
                    <br />
                    <div>
                        <label>attack: </label>
                        <input type="number" placeholder="attack" value={form.attack} onChange={changeHandler} name="attack" autoComplete="off" />
                        {errors.attack && <p>{errors.attack}</p>}
                    </div>
                    <br />
                    <div>
                        <label>defense: </label>
                        <input type="number" placeholder="defense" value={form.defense} onChange={changeHandler} name="defense" autoComplete="off"/>
                        {errors.defense && <p>{errors.defense}</p>}
                    </div>
                    <br />
                    <div>
                        <label>speed: </label>
                        <input type="number" placeholder="speed" value={form.speed} onChange={changeHandler} name="speed" autoComplete="off"/>
                        {errors.speed && <p>{errors.speed}</p>}
                    </div>
                    <br />
                    <div>
                        <label>height: </label>
                        <input type="number" placeholder="height" value={form.height} onChange={changeHandler} name="height" autoComplete="off"/>
                        {errors.height && <p>{errors.height}</p>}
                    </div>
                    <br />
                    <div>
                        <label>weight: </label>
                        <input type="number" placeholder="weight" value={form.weight} onChange={changeHandler} name="weight" autoComplete="off"/>
                        {errors.weight && <p>{errors.weight}</p>}
                    </div>
                    <br />
                    <div>
                        <label>Image: </label>
                        <input type="text" placeholder="Image" value={form.image} onChange={changeHandler} name="image" autoComplete="off"/>
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    <br />
                    <div className={style.Divselect}>
                        <label htmlFor="">Select Types</label>
                        <select onChange={(e)=>handleSelect(e)}>
                            <option>select a type</option>
                            { //e.id ---> e.name

                                types.map( e => {
                                    if(!arr.includes(e.id)){
                                        return (
                                            <option key={e.name} value={`${e.name}` }>{e.name}</option>
                                        )
                                    }
                                    return "hola";
                                })
                            }
                        </select>
                        {errors.types && (<p>{errors.types}</p>)}
                    </div>
                    <br />
                    <div className={style.DivButton}>
                        <button className={style.btnPrimary} type="submit">SUBMIT</button>
                        <div className={style.title}>
                            <h1>CREATE YOUR POKEMON!</h1>
                        </div>
                    </div>
                    <br />
                    
                    
                </form>
            </div>
            <br />
            <div>
                <div className={style.boxImg}>
                    <h3>IMAGE</h3>
                    <div>
                        <img height={200} width={200} src={form.image || `data:image/png;base64,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`} alt={form.name}/>
                    </div>
                </div>
                <div className={style.boxTypesFather}>
                    <h3>TYPES</h3>
                    <div className={style.boxTypes}>
                    {
                            form.types?.map( (e) => {
                                    return (
                                        <div key={e.name}>
                                            <div  className={style.types}>
                                                <li>{e.name}</li>
                                                <button name={`${e.name}`} onClick={(event)=>{filterTypes(event)}}>X</button>
                                            </div>
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div>
            </div>
            
            <div>
                <Link to="/home"><button className={style.btnPrimary}>HOME</button></Link>
            </div>
        </div>
    )
}