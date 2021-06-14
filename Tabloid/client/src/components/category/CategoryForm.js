import React, { useContext, useEffect, useState} from "react"
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";

const CategoryForm = () => {
    const { addCategory, getAllCategories, getCategoryById } = useContext(CategoryContext)
    const [name, setName] = useState("");
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    */
    const [category, setCategory] = useState({});
    const history = useHistory();
        //wait for data before button is active

        const [isLoading, setIsLoading] = useState(true);

        const {categoryId} = useParams();   

    useEffect(() => {
        getAllCategories().then(() => {
          if (categoryId){
            getCategoryById(categoryId)
            .then(category => {
                setCategory(category)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        })
      }, [])

    const submit = (e) => {
        e.preventDefault()
        const category = {
          name
        };
        addCategory(category).then((c) => {
          // Navigate the user back to the home route
          history.push("/categories");
        });
    };

    return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input id="name" onChange={(e) => setName(e.target.value)} />
                  </FormGroup>
                </Form>
                <Button color="info" disabled={isLoading} onClick={submit}>
                  SUBMIT
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    };


export default CategoryForm;