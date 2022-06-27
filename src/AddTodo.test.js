import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const button = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task 1"}});
  fireEvent.change(inputDate, { target: { value: "07/01/2025"}});
  fireEvent.click(button);
  fireEvent.change(inputTask, { target: { value: "Task 1"}});
  fireEvent.change(inputDate, { target: { value: "07/01/2025"}});
  fireEvent.click(button);
  const checkTaskOnce = screen.getAllByText(/Task 1/i);
  const checkTask = screen.getByText(/Task 1/i);
  expect(checkTaskOnce).toHaveLength(1);
  expect(checkTask).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const button = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputDate, { target: { value: "07/01/2025"}});
  fireEvent.click(button);
  const checkTask = screen.getByText(/You have no todo's left/i);
  expect(checkTask).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const button = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task 1"}});
  fireEvent.click(button);
  const checkTask = screen.getByText(/You have no todo's left/i);
  expect(checkTask).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const button = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task 1"}});
  fireEvent.change(inputDate, { target: { value: "07/01/2025"}});
  fireEvent.click(button);
  const checkbox = screen.getByRole('checkbox')
  fireEvent.click(checkbox);
  const checkTask = screen.getByText(/You have no todo's left/i);
  expect(checkTask).toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const button = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task 1"}});
  fireEvent.change(inputDate, { target: { value: "07/01/2025"}});
  fireEvent.click(button);
  fireEvent.change(inputTask, { target: { value: "Task 2"}});
  fireEvent.change(inputDate, { target: { value: "07/01/2019"}});
  fireEvent.click(button);
  const futurecheckTask = screen.getByTestId(/Task 1/i).style.background
  const pastcheckTask = screen.getByTestId(/Task 2/i).style.background
  expect(futurecheckTask).toBe("white")
  expect(pastcheckTask).toBe("rgb(251, 60, 60)")
 });
