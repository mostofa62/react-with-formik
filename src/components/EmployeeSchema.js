import { object, array, string, number } from "yup";
export default object().shape({
    employees:array().of(
        object().shape({
            name: string()
              .ensure()
              .required("Name is required"),
            desg: number()
              .required("Designation is required"),
            
            tested: object()
            .shape({
              value: string().required("Required Test"),
              label: string().required("Required")
            })
            .nullable(),

            skills:array()
            .min(2, "Need at least 2 Skills Required!!")
            .of( 
            
              object().shape({
                value: string().required("Required Skill"),
                label: string().required("Required")
              })
            )
            


            

          })
    )
    .min(1, "Need at least a Employee Information")
});
