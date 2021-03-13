import React from 'react';
import Clock from '../../components/Clock';
import ReactDOM from 'react-dom';

describe("<Clock />", () => {

    describe("when given minutes and seconds", () => {

        it("renders h2 element properly", () => {
            const root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes = {20} seconds = {40} />, root
            );
            expect(root.childNodes[0].nodeName).toEqual("H2");
        });
    
        it("sets a Clock className", () => {
            const root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes = {20} seconds = {40} />, root
            );
            expect(root.childNodes[0].className).toMatch(/Clock/);
        });
    
        it("renders time properly", () => {
            const root = document.createElement("div");
            ReactDOM.render(
                <Clock minutes = {20} seconds = {40} />, root
            );
            expect(root.childNodes[0].textContent).toMatch(/20:40/);
        });
    });

    it("sets className to empty string if not given anything else", () => {
        expect(<Clock minutes = {20} seconds = {40} />).toEqual(<Clock minutes = {20} seconds = {40} />);
    });
});