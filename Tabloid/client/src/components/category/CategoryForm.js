import React, { useContext, useEffect, useState} from "react"
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";

const CategoryForm = () => {
    const { addCategory, getAllCategories, updateCategory, getCategoryById } = useContext(CategoryContext)
    const [name, setName] = useState("");
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    */
    const [editCategory, setEditCategory] = useState({});
    const history = useHistory();
        //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const {categoryid} = useParams();   

        // const handleControlledInputChange = (event) => {
        //     //When changing a state object or array,
        //     //always create a copy make changes, and then set state.
        //     const newCategory = { ...category }
        //     //category is an object with properties.
        //     //set the property to the new value
        //     newCategory[event.target.name] = event.target.value
        //     //update state
        //     setCategory(newCategory)
        //   }
    
          const submit = (e) => {
          setIsLoading(true);
          if (categoryid){
            //PUT - update          
            updateCategory({
                id: editCategory.id,
                name: name
            })
            .then(() => history.push(`/categories`))
          }else {
            //POST - add
            addCategory({
                name: name
            })
            .then(() => history.push("/categories"))
          }
        }

        useEffect(() => {
                getCategoryById(categoryid)
                .then(returnCategory => {
                    console.log(returnCategory)
                    setEditCategory(returnCategory)
                    setIsLoading(false)
                })
          }, [])  

        //   useEffect(() => {
        //     getAllCategories(categoryid).then(setCategory);
        //   }, []);
 

    return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input id="name" onChange={(e) => setName(e.target.value)} placeholder="Category name" defaultValue={editCategory.name} />
                  </FormGroup>
                </Form>
                <Button color="info" disabled={isLoading} onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            submit()
          }}>
             {categoryid ? <>Save</> : <>Add</>}
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    };


export default CategoryForm;