import React, { useContext, useEffect, useState} from "react"
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import Post from "./Post";
import { useHistory, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";

const PostForm = () => {
    const { addPost, getPostById } = useContext(PostContext)
    const [userProfileId, setUserProfileId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [ dateCreated ] = useState("");
    const { category, getAllCategories } = useContext(CategoryContext)
    
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */
    const [post, setPost] = useState({});

    const history = useHistory();
        //wait for data before button is active
        const [isLoading, setIsLoading] = useState(true);

        const {postId} = useParams();

    // Get categories.
    useEffect(() => {
        getAllCategories().then(() => {
          if (postId){
            getPostById(postId)
            .then(post => {
            console.log(category)
                setPost(post)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        })
      }, [])

      const submit = (e) => {
        e.preventDefault()
        const post = {
          title,
          content,
          categoryId,
          userProfileId: +userProfileId,
          dateCreated
        };
        addPost(post).then((p) => {
          // Navigate the user back to the home route
          history.push("/post");
        });
    };

    return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="userId">User Id (For Now...)</Label>
                    <Input
                      id="userId"
                      onChange={(e) => setUserProfileId(e.target.value)}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="imageUrl">Gif URL</Label>
                    <Input
                      id="imageUrl"
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" onChange={(e) => setTitle(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="caption">Content</Label>
                    <Input
                      id="content"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="category">Category</Label>
                    <select value={post.categoryId} name="categoryId" onChange={e => setCategoryId(e.target.value)}
                  >
                   
                    <option value="0">Select a Category</option>
                    {category.map(c => (
                    <option key={c.id} value={c.id}>
                    {c.name}
                    </option>))}
                    </select>
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


export default PostForm;