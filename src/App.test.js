import { render, screen } from '@testing-library/react';
import App from './App';
import InviteList from "./InviteList";

test('should render title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Invited Partners/i);
  expect(titleElement).toBeInTheDocument();
});

test('should render invited list', () => {
  render(<InviteList />);
  const listElement = screen.getByRole("list");
  expect(listElement).toBeInTheDocument();
});

test('should display name and partner_id', async () => {
  const samplePartners = [
    {
      "latitude": "42.7034111",
      "partner_id": 1,
      "name": "Jamelia Waller",
      "longitude": "23.4862259",
      "distance": "11.73"
    },
    {
      "latitude": "42.6264989",
      "partner_id": 3,
      "name": "Gracie-Leigh Mccallum",
      "longitude": "23.4097679",
      "distance": "6.51"
    }
  ]

  render(<InviteList initialData={samplePartners} />);
  const nameElement = await screen.findByText("1 Jamelia Waller");
  expect(nameElement).toBeInTheDocument();
});