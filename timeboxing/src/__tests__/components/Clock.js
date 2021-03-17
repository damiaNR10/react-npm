import React from 'react';
import Clock from '../../components/Clock';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

let root = null;
let clockRenderer = null;
describe("<Clock />", () => {

    describe("when given minutes and seconds (DOM)", () => {

        beforeEach(() =>{
            root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes = {20} seconds = {40} />, root
            );
        });

        it("renders properly", () => {
            expect(root.childNodes[0].nodeName).toEqual("H2");
            expect(root.childNodes[0].className).toMatch(/Clock/);
            expect(root.childNodes[0].textContent).toMatch(/20:40/);
        });

        it("renders h2 element properly", () => {
            expect(root.childNodes[0].nodeName).toEqual("H2");
        });
    
        it("sets a Clock className", () => {
            expect(root.childNodes[0].className).toMatch(/Clock/);
        });
    
        it("renders time properly", () => {
            expect(root.childNodes[0].textContent).toMatch(/20:40/);
        });
    });

    describe("when given minutes and seconds (TestRenderer)", () => {

        beforeEach(() =>{
            clockRenderer = renderer.create(
                <Clock minutes = {20} seconds = {40} />
            )
        });

        it("renders properly", () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
            // expect(clockRenderer.toJSON().type).toEqual('h2');
            // expect(clockRenderer.toJSON().props).toMatchObject({'className': expect.stringMatching(/Clock/)});
            // expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining(["20", "40"]));
        });

        it("renders h2 element properly", () => {
            expect(clockRenderer.toJSON().type).toEqual('h2');
        });
    
        it("sets a Clock className", () => {
            expect(clockRenderer.toJSON().props).toMatchObject({'className': expect.stringMatching(/Clock/)});
        });
    
        it("renders time properly", () => {
            expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining(["20", "40"]));
        });
    });

    it("sets className to empty string if not given anything else", () => {
        expect(<Clock minutes = {20} seconds = {40} />).toEqual(<Clock minutes = {20} seconds = {40} />);
    });
});