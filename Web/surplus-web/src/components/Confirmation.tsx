import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export async function confirmYesNo(
  aTitle,
  aMessage,
  aFunctionOnYes,
  aFunctionOnNo
) {
  let result = false;
  await confirmAlert({
    title: aTitle,
    message: aMessage,
    buttons: [
      {
        label: "Yes",
        onClick: () => aFunctionOnYes(),
      },
      {
        label: "No",
        onClick: () => aFunctionOnNo,
      },
    ],
  });
  return result;
}
