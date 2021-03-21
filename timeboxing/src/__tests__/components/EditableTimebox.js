import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import EditableTimebox from '../../components/EditableTimebox';

describe("<EditableTimebox />", () => {

    afterEach(() => {
        cleanup();
    })

    it("shows 'Edit' button", () => {
        const {debug, getByText} = render(<EditableTimebox />);
        expect(() => {
            getByText("Edytuj");
        }).not.toThrow();
    })

    it("allows editing the timebox", () => {
        const {debug, getByText} = render(<EditableTimebox />);
        userEvent.click(screen.getByText("Edytuj"));
        //userEvent.click(screen.getByRole('button', {name: 'Edytuj'}));
        expect(() => {
            getByText(/zmiany/);
        }).not.toThrow();

        userEvent.click(screen.getByText(/zmiany/))
        expect(() => {
            getByText("Edytuj");
        }).not.toThrow();
    })
});