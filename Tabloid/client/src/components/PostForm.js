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
    const {  addPost, getPost, updatePost } = useContext(PostContext)
    // const [userProfileId, setUserProfileId] = useState("");
    // const [imageUrl, setImageUrl] = useState("");
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    // const [categoryId, setCategoryId] = useState("");
    // const [ dateCreated ] = useState("");
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
          console.log(postId)
          if (postId){
            getPost(postId)
            // console.log(postId)
            .then(post => {
            
                setPost(post)
                console.log(post)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        })
      }, [])

    //   const submit = (e) => {
    //     e.preventDefault()
    //     const post = {
    //       title,
    //       content,
    //       categoryId,
    //       userProfileId: +userProfileId,
    //       dateCreated
    //     };
    //     addPost(post).then((p) => {
    //       // Navigate the user back to the home route
    //       history.push("/post");
    //     });
    // };

    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newPost = { ...post }
      //animal is an object with properties.
      //set the property to the new value
      newPost[event.target.id] = event.target.value
      //update state
      setPost(newPost)
    }



    const handleSavePost = () => {
      if (parseInt(post.categoryId) === 0) {
          window.alert("Please select a location")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (postId){
          //PUT - update
          updatePost({
              Id: post.Id,
              Title: post.Title,
              Content: post.Content,
              CreateDateTime: post.CreateDateTime,
              IsApproved: post.IsApproved,
              PublishDateTime: post.PublishDateTime,
              PmageLocation: post.ImageLocation,
              CategoryId: parseInt(post.CategoryId),
              UserProfileId: parseInt(post.UserProfileId)
          })
          //pushes a new entry onto the history stack
          .then(() => history.push(`/posts/${post.id}`))
        }else {
          //POST - add
          addPost({
              title: post.title,
              content: post.content,
              categoryId: parseInt(post.categoryId)
          })
          //pushes a new entry onto the history stack
          .then(() => history.push("/post"))
        }
      }
    }


    return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="Title" onChange={handleControlledInputChange} defaultValue={post.title}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="content">Content</Label>
                    <Input id="content" name="Content" onChange={handleControlledInputChange} defaultValue={post.content}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="categoryId">Category</Label>
                    <select value={post.categoryId} name="categoryId" onChange={handleControlledInputChange}>
                      <option value="0">Select a Category</option>
                      {category.map(c => (
                      <option key={c.id} value={c.id}>
                      {c.name}
                      </option>))}
                    </select>
                  </FormGroup>
                </Form>
                <button className="btn btn-primary"
                  disabled={isLoading}
                  onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSavePost()
                  }}>
                {postId ? <>Save Post</> : <>Add Post</>}</button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    };


export default PostForm;