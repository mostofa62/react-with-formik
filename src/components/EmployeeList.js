import React, { useState,Fragment } from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import EmployeeSchema from './EmployeeSchema';
//import ErrorMessage from './ErrorMessage';
import Checkbox from './checkbox';
//import Select from 'react-select';
import SelectField from './SelectField';

const EmployeeList = ()=>{

    const employee_new_entry = { 
        name:'', 
        desg:'',
        enabled:false, 
        tested:"", 
        skills:[],
        purchased:[],
        kicked:null
    };
    const items = [
        {value:1,label:"Mango"},
        {value:2, label:"Orange"},
        {value:3, label:"Banana"},
        {value:4, label:"Coconut"}
    ]
    const kicked_from =[
        {value:1,label:"Roof"},
        {value:2, label:"Balcony"},
        {value:3, label:"Road"},
    ];
    
    const employees = [
        {
            name:'Mostofa',
            desg:'1',
            enabled:false,
            tested: { value: 'vanilla', label: 'Vanilla' },
            skills:[
                {value:'c', label:'C'},        
            ],
            purchased:[1,4],
            kicked:2

        },
        {
            name:'Nadim',
            desg:'2',
            enabled:false,
            tested:"",
            skills:[],
            purchased:[3],
            kicked:3
        },
        {
            name:'Imran',
            desg:'3',
            enabled:true,
            tested:"",
            skills:[
                {value:'c++', label:'C++'},
                {value:'javascript', label:'JavaScript'}
            ],
            purchased:[],
            kicked:null
        },
    ];
    
    const [data, setData] = useState([]);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const skills = [
        {value:'php', label:'PHP'},
        {value:'c', label:'C'},
        {value:'c++', label:'C++'},
        {value:'javascript', label:'JavaScript'}
    ];

    
      

    return (
    <Fragment>

        <h1>Employee List- With Initials Values</h1>
        <Formik
        /*initialValues={{ employees:[] }}*/
        initialValues={{ employees }}
        validationSchema={EmployeeSchema}

        onSubmit={values =>
            setTimeout(() => {
              //alert(JSON.stringify(values, null, 2));
              setData(values);
            }, 500)
        }
   
        render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
            
            <Form>
                {errors.employees  && errors.employees.constructor!==Array && (<span>{errors.employees}</span>)}
                <FieldArray
                name="employees"
                render={arrayHelpers=>(
                    <div>
                        {
                            values.employees && values.employees.length > 0 ?
                            (
                                values.employees.map((employee, index)=>(
                                    <div key={index}>
                                        <h5>{index+1}</h5>
                                        <Field name={`employees[${index}].name`} />
                                        
                                        {errors.employees &&
                                        errors.employees[index] &&
                                        errors.employees[index].name &&
                                        touched.employees &&
                                        touched.employees[index] &&
                                        touched.employees[index].name && ( 
                                            <span>
                                                {errors.employees[index].name}
                                            </span>   
                                        )}
                                        <Field as="select" name={`employees.${index}.desg`}>
                                            <option value="">SELECT</option>
                                            <option value="1">BOSS</option>
                                            <option value="2">MANAGER</option>
                                            <option value="3">STAFF</option>
                                        </Field>
                                        {errors.employees &&
                                        errors.employees[index] &&
                                        errors.employees[index].desg &&
                                        touched.employees &&
                                        touched.employees[index] &&
                                        touched.employees[index].desg && ( 
                                            <span>
                                                {errors.employees[index].desg}
                                            </span>   
                                        )}
                                        <Field
                                    label={"Enabled"}
                                    type="checkbox"
                                    component={Checkbox}
                                    name={`employees.${index}.enabled`}
                                    checked={values.employees[index].enabled}
                                    onChange={() => {
                                    /*  
                                    console.log(
                                        values.employees[index].enabled
                                      );
                                      */

                                      setFieldValue(
                                        `employees.${index}.enabled`,
                                        !values.employees[index].enabled
                                      );
                                    }}
                                  />
                                 
                                 <SelectField 
                                 placeholder="Select Employee Test"
                                 isSearchable
                                  name={`employees.${index}.tested`} options={options} />

{errors.employees &&
                                        errors.employees[index] &&
                                        errors.employees[index].tested &&
                                        touched.employees &&
                                        touched.employees[index] &&
                                        touched.employees[index].tested && ( 
                                            <span>
                                                {errors.employees[index].tested.value}
                                            </span>   
                                        )}


<SelectField
placeholder="Select Skills"
isSearchable
                                 isMulti
                                 defaultValueArray={[skills[0],skills[2]]}
                                 isClearable
                                 name={`employees.${index}.skills`} options={skills} />
                                 {errors.employees 
                                 && errors.employees[index] 
                                 &&  errors.employees[index].skills
                                 && touched.employees &&
                                        touched.employees[index] &&
                                        touched.employees[index].skills
                                 && (<span>{errors.employees[index].skills}</span>)}

                                  
                                        <br/>



<div className='purchase-list'>
    {items.map((item, i)=>(
            <Field
            label={item.label}
            type="checkbox"
            component={Checkbox}
            name={`employees.${index}.purchased`}
            checked={values.employees[index].purchased.includes(item.value)}
            onChange={(e) => {
            const {checked, name} = e.target;  
                console.log(checked,name)
              
                if (checked) {

                    setFieldValue(
                        name,
                        [...values.employees[index].purchased, item.value]
                    );
                }else{

                    setFieldValue(
                        name,
                        values.employees[index].purchased.filter((v) => v !== item.value)
                    );

                }
            }}
          />

    ))}
<br/>
{errors.employees 
                                 && errors.employees[index] 
                                 &&  errors.employees[index].purchased
                                 && touched.employees &&
                                        touched.employees[index] &&
                                        touched.employees[index].purchased
                                 && (<span>{errors.employees[index].purchased}</span>)}

    
</div>
<div className='kicked_from'>
    { kicked_from.map((kickedf,i)=>(
        
        <>
        <Field
            label={kickedf.label}
            type="radio"
            component={Checkbox}
            name={`employees.${index}.kicked`}
            checked={values.employees[index].kicked === kickedf.value}
            onChange={(e) => {
            const {checked, name} = e.target;  
                console.log(checked,name)
              
                if (checked) {

                    setFieldValue(
                        name,
                        kickedf.value
                    );
                }else{

                    setFieldValue(
                        name,
                        null
                    );

                }
            }}
          />
        
        </>

    ))

    }
<br/>
{errors.employees 
                                 && errors.employees[index] 
                                 &&  errors.employees[index].kicked
                                 && touched.employees &&
                                        touched.employees[index] &&
                                        touched.employees[index].kicked
                                 && (<span>{errors.employees[index].kicked}</span>)}

</div>


                                        <button
                                        type="button"
                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                        >
                                        -
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.insert(index+1, employee_new_entry)} // insert an empty string at a position
                                        >
                                        +
                                        </button>
                                        <hr/>
                                    </div>
                                    

                                ))
                            ):
                            (
                                <button type="button" onClick={() => arrayHelpers.push(employee_new_entry)}>                     
                                    Add a Employee
                                </button>
                            )

                        }

                    <div>
                        <button disabled={!isValid || isSubmitting} type="submit">Submit</button>
                    </div>

                    <code>
                        <pre>Submit Values: {JSON.stringify(data, null, 2)}</pre>
                    </code>    
                    <code>
                        <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                    </code>
                    <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                    <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>                            
                    </div>
                )}
                />
            </Form>
        )}
    />
    </Fragment>
    );

};

export default EmployeeList;