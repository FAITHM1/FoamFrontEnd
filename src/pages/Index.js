import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Index(props) {
  const navigate = useNavigate();
  const [content, setContent] = useState({
    value: "",
  });
  const [editFoam, setEditFoam] = useState({
    foam: "",
    __v: "",
  });
  //handle change functions
  const handleChange = (event) => {
    const newState = { ...editFoam };
    newState[event.target.name] = event.target.value;
    console.log(editFoam, newState);
    setEditFoam(newState);
  };

  const saveChange = (event) => {
    const newState = { ...content };
    newState[event.target.name] = event.target.value;
    setContent(newState);
    console.log(newState);
  };

  //could be in a componnet
  const sort = (
    <select
      name="value"
      value={content.value}
      onClick={console.log(content.value)}
      onChange={saveChange}
      defaultValue="unclassified"
    >
      <option
        value="foaming"
        onClick={() => {
          setContent(sort.props.children[0].props.value);
        }}
      >
        foaming
      </option>
      <option
        value="notfoaming"
        onClick={() => {
          setContent(sort.props.children[1].props.value);
        }}
      >
        non-foaming
      </option>
      <option
        value="unclassified"
        onClick={() => {
          setContent(sort.props.children[2].props.value);
        }}
      >
        unclassified images
      </option>
    </select>
  );

  if (props.foaming) {
    return (
      <>
        <label for="cars">Sort</label>
        {sort}

        <div class="container">
          <div class="row">
            {props.foaming.map((x) => {
              if (x.foam === "yes" && content.value === "foaming") {
                
                return (
                  <div key={x._id} class="col-lg">
                    <div>
                      <img src={x.url} class="img-thumbnail" />
                      <form>
                        <label htmlFor="is foaming?">Is it Foaming?</label>
                        <select
                          name="foam"
                          value={x.foam}
                          onChange={handleChange}
                        >
                          <option
                            value="yes"
                            onClick={(event) => {
                              event.preventDefault();
                              props.updateFoaming(editFoam, x._id);
                            }}
                          >
                            {" "}
                            yes
                          </option>
                          <option
                            value="no"
                            onClick={() => {
                              props.updateFoaming(editFoam, x._id);
                            }}
                          >
                            no
                          </option>
                        </select>
                      </form>
                    </div>
                  </div>
                );
              } else if (x.foam === "no" && content.value === "notfoaming") {
                return (
                  <div key={x._id} class="col-lg">
                    <div>
                      <img src={x.url} class="img-thumbnail" />
                      <form>
                        <label htmlFor="is foaming?">Is it Foaming?</label>
                        <select
                          name="foam"
                          value={x.foam}
                          onChange={handleChange}
                          onClick={() => {
                            props.updateFoaming(editFoam, x._id);
                          }}
                        >
                          <option value="yes" onChange={handleChange}>
                            {" "}
                            yes
                          </option>
                          <option value="no" onChange={handleChange}>
                            no
                          </option>
                        </select>
                      </form>
                    </div>
                  </div>
                );
              } else if (
                (x.foam !== "yes" && content.value === "unclassified") ||
                ""
              ) {
                if (x.foam !== "no") {
                  return (
                    <div key={x._id} class="col-lg">
                      <div>
                        <img src={x.url} class="img-thumbnail" />
                        <form>
                          <label htmlFor="is foaming?">Is it Foaming?</label>
                          <select
                            name="foam"
                            value={x.foam}
                            onChange={handleChange}
                            onClick={() => {
                              props.updateFoaming(editFoam, x._id);
                            }}
                          >
                            <option value="yes"> yes</option>
                            <option value="no">no</option>
                          </select>
                        </form>
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Index;
