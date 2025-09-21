import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import ResponseView from './ResponseView';
import { renderWithProviders } from '@/__tests__/setupTests';

import { MessageContext } from '@/components/common/MessageContextProvider';
const addSnackMessageMock = vi.fn();

function renderWithContext(props: React.ComponentProps<typeof ResponseView>) {
  return renderWithProviders(
    <MessageContext.Provider value={{ addSnackMessage: addSnackMessageMock }}>
      <ResponseView {...props} />
    </MessageContext.Provider>,
    { locale: 'en' }
  );
}

describe('ResponseView', () => {
  it('render responseBody, if has statusResp и body', () => {
    renderWithContext({ statusResp: 200, body: '{"foo":"bar"}' });

    expect(screen.getByText(/Response/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: 200/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/"foo": "bar"/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Format JSON/i })).toBeNull();
  });

  it('render requestBody with button and textarea, if not statusResp,but has bodyChange and setBodyReq', () => {
    const onBodyChange = vi.fn();
    const setBodyReq = vi.fn();

    renderWithContext({
      body: '{"test":123}',
      bodyChange: onBodyChange,
      setBodyReq: setBodyReq,
    });

    expect(
      screen.getByRole('button', { name: /Format JSON/i })
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue('{"test":123}')).toBeInTheDocument();
  });

  it('no render if not statusResp, not bodyChange and setBodyReq', () => {
    const { container } = renderWithContext({});

    expect(container).toBeEmptyDOMElement();
  });

  it('handling click button format and call setBodyReq and bodyChange', () => {
    const validJson = '{"a":1,"b":2}';
    const formattedJson = `{
  "a": 1,
  "b": 2
}`;

    const setBodyReq = vi.fn();
    const bodyChange = vi.fn();

    renderWithContext({
      body: validJson,
      setBodyReq,
      bodyChange,
    });

    const button = screen.getByRole('button', { name: /Format JSON/i });
    fireEvent.click(button);

    expect(setBodyReq).toHaveBeenCalledWith(formattedJson);
    expect(bodyChange).toHaveBeenCalledWith(formattedJson);
  });

  it('show mistake if incorrect JSON and call addSnackMessage', () => {
    const invalidJson = '{"a":1,}';
    renderWithContext({
      body: invalidJson,
      setBodyReq: vi.fn(),
      bodyChange: vi.fn(),
    });

    const button = screen.getByRole('button', { name: /Format JSON/i });
    fireEvent.click(button);

    expect(addSnackMessageMock).toHaveBeenCalled();
    expect(addSnackMessageMock.mock.calls[0][0].messageType).toBe('error');
    expect(addSnackMessageMock.mock.calls[0][0].text).toMatch(/Invalid JSON/i);
  });
});
