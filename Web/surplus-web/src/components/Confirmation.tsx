import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export async function confirmWithTwoButtons(
  aButtonConfirmLabel,
  aButtonDenyLabel,
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
        label: aButtonConfirmLabel,
        onClick: () => aFunctionOnYes(),
      },
      {
        label: aButtonDenyLabel,
        onClick: () => aFunctionOnNo(),
      },
    ],
  });
  return result;
}

export async function confirmWithSingleButton(
  aButtonConfirmLabel,
  aTitle,
  aMessage,
  aFunctionOnYes
) {
  let result = false;
  await confirmAlert({
    title: aTitle,
    message: aMessage,
    buttons: [
      {
        label: aButtonConfirmLabel,
        onClick: () => aFunctionOnYes(),
      },
    ],
  });
  return result;
}
