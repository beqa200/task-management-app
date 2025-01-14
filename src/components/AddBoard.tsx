import React, { useContext, useState } from "react";
import { COLORS, MyContext } from "../App";
import { deleteIcon } from "../assets";
import {
  FormWrapper,
  StyledButton,
  StyledLabel,
  StyledWhiteButton,
  SubTaskInput,
  TitleInput,
} from "../styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Platform } from "../vite-env";

export default function AddBoard() {
  const context = useContext(MyContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>({ mode: "all" });

  const [newBoard, setNewBoard] = useState({
    name: "",
    slug: "",

    columns: [
      {
        name: "",
        tasks: [],
        color: "",
        id: (Math.random() * 100000).toFixed(0),
      },
    ],
  });

  const addColumn = () => {
    const clone = newBoard;
    clone.columns.push({
      name: "",
      tasks: [],
      color: "",
      id: (Math.random() * 100000).toFixed(0),
    });
    setNewBoard({ ...clone });
  };

  const onSubmit = (data: any) => {
    const clone: Platform[] | undefined = context?.boards;
    if (
      clone &&
      context?.boards.every(
        (item) =>
          item.name.toLocaleLowerCase() != newBoard.name.toLocaleLowerCase()
      )
    ) {
      clone?.push(newBoard);
      localStorage.setItem("storedBoards", JSON.stringify(clone));
      context?.setBoards(clone);

      context?.setIsNewBoard(false);
      context?.setPlatform(data.name);
      navigate(`/${newBoard.slug}`);
    } else {
      setError("name", { type: "value", message: "Already exists" });
    }
  };
  return (
    <FormWrapper theme={context?.theme} isDark={context?.isDark}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading">Add New Board</h1>
        <div className="input-div">
          <StyledLabel>Board Name</StyledLabel>
          <TitleInput
            style={
              errors.name != undefined
                ? { border: "1px solid #EA5555" }
                : { border: "" }
            }
            placeholder="e.g. Web Design"
            {...register("name", {
              required: { value: true, message: "Can’t be empty" },
            })}
            onChange={(e) => {
              const clone = { ...newBoard };
              clone.name = e.target.value;
              clone.slug = e.target.value.toLocaleLowerCase().replace(" ", "-");
              setNewBoard(clone);
            }}
          />
          {errors.name?.message && (
            <p style={{ width: "96px", left: "70%" }}>{errors.name?.message.toString()}</p>
          )}
        </div>
        <div className="input-div">
          <StyledLabel>Board Columns</StyledLabel>
          <div
            style={{
              marginBottom: "12px",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {newBoard.columns.map((item, index) => {
              item.color = COLORS[index];
              {
                return (
                  <div className="item" key={Math.random()}>
                    <SubTaskInput
                      style={
                        errors[`column${item.id}`] != undefined
                          ? { border: "1px solid #EA5555" }
                          : { border: "" }
                      }
                      placeholder="e.g. Todo"
                      {...register(`column${item.id}`, {
                        required: { value: true, message: "Can’t be empty" },
                      })}
                      onChange={(e) => {
                        const clone = newBoard;
                        clone.columns[index].name = e.target.value;
                        setNewBoard(clone);
                      }}
                    />
                    <img
                      src={deleteIcon}
                      onClick={() => {
                        const clone: any = newBoard;
                        clone.columns.splice(index, 1);
                        setNewBoard({ ...clone });
                      }}
                    />
                    {errors[`column${item.id}`]?.message && (
                      <p>Can’t be empty</p>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <StyledWhiteButton className="addButton" onClick={addColumn}>
          + Add New Column
        </StyledWhiteButton>

        <StyledButton
          style={{ height: "40px", width: "100%", marginTop: "24px" }}
          type="submit"
        >
          Create New Board
        </StyledButton>
      </form>
    </FormWrapper>
  );
}
