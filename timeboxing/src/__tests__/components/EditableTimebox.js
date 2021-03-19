import { render } from '@testing-library/react';
import EditableTimebox from '../../components/EditableTimebox';

describe("<EditableTimebox />", () => {
    it("fails for now", () => {
        const {debug, getByText} = render(<EditableTimebox />);
        debug();
    })
});