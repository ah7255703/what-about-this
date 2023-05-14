import { BiImageAdd, BiPlus, BiTrash } from "react-icons/bi";
import Button from "./Button";
import Input from "./Input";
import { useReducer, useState } from "react";
import React from "react";
import { produce } from "immer";
import cn from "utils/cn";
import ViewableImage from "./ViewableImage";
import { FaExpand } from "react-icons/fa";

function uuid4() {
  const randomString =
    Math.random().toString(36).substr(2, 10) +
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);

  // Create a pattern for the UUID
  const pattern = /[xy]/g;
  const replaceFn = function (c: string) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  };

  // Replace the pattern with random values
  const uuid = randomString.replace(pattern, replaceFn);

  return uuid;
}

type StateType = {
  editor: {
    errors: Array<string | null>;
    states: { [key: string]: string[] };
  };
  data: {
    options: Array<{
      label: string;
      imageUrl?: string;
      id: string;
    }>;
  };
};

type actionType =
  | { type: "NEW_OPTION" }
  | { type: "CLEAR" }
  | { type: "SET_ERROR"; payload: { error: string } }
  | { type: "SET_LABEL"; payload: { new: string; id: string } }
  | { type: "DELETE_OPTION"; payload: { id: string } }
  | {
      type: "ADD_IMAGE";
      payload: {
        id: string;
        imgUrl?: string;
      };
    };

function getOption(state: StateType, id: string) {
  return state.data?.options?.find((option) => option.id === id);
}

function reducer(state: StateType, action: actionType): StateType {
  return produce(state, (draft) => {
    switch (action.type) {
      case "NEW_OPTION":
        draft.data?.options?.push({ label: "", imageUrl: "", id: uuid4() });
        break;

      case "DELETE_OPTION": {
        draft.data.options = draft.data.options.filter(
          (v) => v.id !== action.payload.id
        );

        break;
      }
      case "SET_LABEL": {
        const option = getOption(draft, action.payload.id);
        if (option) {
          option.label = action.payload.new;
        }
        break;
      }
      case "ADD_IMAGE": {
        const option = getOption(draft, action.payload.id);
        if (option) {
          option.imageUrl = action.payload.imgUrl;
        }
        break;
      }
      default:
        break;
    }
  });
}

function Image({ imageUrl }: { imageUrl: string }) {
  const [collapsed, setcollapsed] = useState(false);
  return (
    <div className="w-full relative">
      <div className="absolute w-full left-2 bottom-0 z-20">
        <button
          className={cn("text-xl transition-all", collapsed && "rotate-45")}
          onClick={() => setcollapsed(!collapsed)}
        >
          <FaExpand />
        </button>
      </div>
      <div
        className={cn(
          "w-full overflow-hidden transition duration-100 ease-in",
          collapsed && "h-10"
        )}
      >
        <div
          className={cn(
            "relative w-11/12 mx-auto h-auto aspect-video rounded-lg mt-2 overflow-hidden object-cover"
          )}
        >
          <ViewableImage fill src={imageUrl} alt="Option Image" />
        </div>
      </div>
    </div>
  );
}

export default function PollsOptionsEditor() {
  const [state, dispatch] = useReducer(reducer, {
    editor: {
      errors: [],
      states: {
        expanded: [],
        collapsed: [],
      },
    },
    data: {
      options: [],
    },
  });
  console.log(state);

  function handleNew() {
    dispatch({ type: "NEW_OPTION" });
  }
  function handleDelete(id: string) {
    dispatch({ type: "DELETE_OPTION", payload: { id: id } });
  }
  function imageUploadFn(file: File, setError: (error: string) => void) {
    return "";
  }
  function setError(error: string) {
    dispatch({
      type: "SET_ERROR",
      payload: {
        error,
      },
    });
  }

  function handleImageUpload(id: string, file: File) {
    dispatch({
      type: "ADD_IMAGE",
      payload: { id, imgUrl: imageUploadFn(file, setError) },
    });
  }
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-medium">
          Options
          <span className="mx-0.5 text-xs">
            ({state.data?.options?.length})
          </span>
        </h2>
        <Button
          onClick={handleNew}
          intent="primary"
          className="rounded-full p-2 text-white"
        >
          <BiPlus size={25} />
        </Button>
      </div>
      <div className="block my-2 w-full h-px bg-black/20" />
      <div className="options space-y-2">
        {state.data?.options?.map(({ label, imageUrl, id }, index) => {
          return (
            <div className="option" key={index}>
              <div className="input flex items-center gap-2 justify-between border-slate-300 border-[1px] p-1 rounded-full">
                <Input
                  value={label}
                  onChange={({ target }) => {
                    dispatch({
                      type: "SET_LABEL",
                      payload: { new: target.value, id: id },
                    });
                  }}
                  inputClassName="border-none"
                  className="flex-1"
                />
                <div className="controllers flex items-center gap-2">
                  <Button
                    intent="danger"
                    onClick={() => {
                      handleDelete(id);
                    }}
                    className="p-1 rounded-full"
                  >
                    <BiTrash />
                  </Button>
                  <input
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(id, file);
                      }
                    }}
                    type="file"
                    className="hidden"
                    id={id}
                  />
                  <Button intent="outline" className="p-1 rounded-full">
                    <label htmlFor={id}>
                      <BiImageAdd />
                    </label>
                  </Button>
                </div>
              </div>
              {imageUrl && <Image imageUrl={imageUrl} />}
            </div>
          );
        })}
      </div>
    </>
  );
}
