import { render, cleanup, screen, userEvent, fireEvent } from '@testing-library/react';
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
        fireEvent.click(screen.getByText("Edytuj"));
        //userEvent.click(screen.getByRole('button', {name: 'Edytuj'}));
        fireEvent.click(screen.getByText(/zmiany/))
        expect(() => {
            getByText("Edytuj");
        }).not.toThrow();
    })
});