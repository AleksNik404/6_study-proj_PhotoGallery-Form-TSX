import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Form } from '../../pages/FormPage/components';
import { describe, vitest } from 'vitest';

import {
  DATE_PERIOD_ERROR_MESSAGE,
  DATE_REQUIRED_ERROR_MESSAGE,
  DISCOUNT_REQUIRED_ERROR_MESSAGE,
  FILE_REQUIRED_ERROR_MESSAGE,
  PRICE_OPTIONS,
  NAME_CAPITALIZE_ERROR_MESSAGE,
  NAME_REQUIRED_ERROR_MESSAGE,
  NAME_TOO_LONG_ERROR_MESSAGE,
  PRICE_REQUIRED_ERROR_MESSAGE,
  TERM_REQUIRED_ERROR_MESSAGE,
} from '../../utils/constants';

describe('Form submit', () => {
  beforeEach(() => {
    window.URL.createObjectURL = vitest.fn();
    crypto.randomUUID = vitest.fn();
  });

  it.skip('full form submission test', async () => {
    const addOneCard = vitest.fn();
    const fileForUpload = new File(['hello'], 'hello.png', { type: 'image/png' });

    render(<Form addOneCard={addOneCard} />, { wrapper: BrowserRouter });

    const textInput = screen.getByLabelText('Title');
    const dateInput = screen.getByLabelText('Release Date');
    const fileInput = screen.getByLabelText<HTMLInputElement>('Select image');
    const priceInput = screen.getByLabelText('Price');
    const radioInput = screen.getByLabelText('yes');
    const checkbox = screen.getByLabelText('i agree to the xdd Terms');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(textInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(radioInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await userEvent.type(textInput, 'We all make choices, but in the end our choices make us'); // Error validation
    await userEvent.type(dateInput, '2023-03-26');
    await userEvent.selectOptions(priceInput, '19');
    await userEvent.click(radioInput);
    await userEvent.click(checkbox);
    await userEvent.upload(fileInput, fileForUpload);

    await userEvent.click(submitButton);
    expect(screen.getByText(NAME_TOO_LONG_ERROR_MESSAGE)).toBeInTheDocument();
    expect(addOneCard).toBeCalledTimes(0);

    await userEvent.clear(textInput);
    await userEvent.type(textInput, 'A Real Hero');
    await userEvent.click(submitButton);
    expect(screen.queryByText(NAME_TOO_LONG_ERROR_MESSAGE)).not.toBeInTheDocument();
    expect(addOneCard).toBeCalledTimes(1);
  });
});

describe('che', () => {
  let submitButton: HTMLElement;

  beforeEach(() => {
    window.URL.createObjectURL = vitest.fn();
    crypto.randomUUID = vitest.fn();

    const addOneCard = vitest.fn();
    render(<Form addOneCard={addOneCard} />, { wrapper: BrowserRouter });
    submitButton = screen.getByRole('button', { name: /submit/i });
  });

  it('TEXT field validation messages', async () => {
    const textInput = screen.getByLabelText('Title');

    await userEvent.click(submitButton);
    expect(screen.getByText(NAME_REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();

    await userEvent.type(textInput, 'lower case');
    await userEvent.click(submitButton);
    expect(screen.getByText(NAME_CAPITALIZE_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('DATE field validation messages', async () => {
    const dateInput = screen.getByLabelText('Release Date');

    await userEvent.click(submitButton);
    expect(screen.getByText(DATE_REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();

    await userEvent.type(dateInput, '2077-03-26');
    await userEvent.click(submitButton);
    expect(screen.queryByText(DATE_PERIOD_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('FILE field validation messages', async () => {
    const fileInput = screen.getByLabelText<HTMLInputElement>('Select image');
    const fileForUpload = new File(['Nuclear'], 'Nuclear.png', { type: 'image/png' });

    await userEvent.click(submitButton);
    expect(screen.getByText(FILE_REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();

    await userEvent.upload(fileInput, fileForUpload);
    await userEvent.click(submitButton);

    expect(fileInput.files?.item(0)).toStrictEqual(fileForUpload);
    expect(fileInput.files![0]?.type).toMatch(/image\/(jpeg|png|gif)/);
    expect(fileInput.files).toHaveLength(1);
    expect(screen.queryByText(FILE_REQUIRED_ERROR_MESSAGE)).not.toBeInTheDocument();
  });

  it.skip('DISCOUNT field validation messages', async () => {
    const radioInput = screen.getByLabelText('yes');

    await userEvent.click(submitButton);
    expect(screen.getByText(DISCOUNT_REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();

    await userEvent.click(radioInput);
    await userEvent.click(submitButton);
    expect(screen.queryByText(DISCOUNT_REQUIRED_ERROR_MESSAGE)).not.toBeInTheDocument();
  });

  it.skip('PRICE field validation messages', async () => {
    const priceInput = screen.getByLabelText('Price');

    await userEvent.click(submitButton);
    expect(screen.getByText(PRICE_REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();

    await userEvent.selectOptions(priceInput, String(PRICE_OPTIONS[0]));
    await userEvent.click(submitButton);
    expect(screen.queryByText(PRICE_REQUIRED_ERROR_MESSAGE)).not.toBeInTheDocument();
  });

  it('TERM field validation messages', async () => {
    const checkbox = screen.getByLabelText('i agree to the xdd Terms');

    await userEvent.click(submitButton);
    expect(screen.getByText(TERM_REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();

    await userEvent.click(checkbox);
    await userEvent.click(submitButton);
    expect(screen.queryByText(TERM_REQUIRED_ERROR_MESSAGE)).not.toBeInTheDocument();
  });
});