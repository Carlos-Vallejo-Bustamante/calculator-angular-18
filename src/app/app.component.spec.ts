import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent!!!', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should be 3', () => {
    // A = Arrange --> Set up the test data
    const num1 = 1;
    const num2 = 2;

    // A = Act --> Run the code that you want to test
    const result = num1 + num2;

    // A = Assert --> Check that the result is correct
    expect(result).toBe(3);
  })

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(component.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull()
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    const divClasses = divElement?.classList.value.split(' ');

    expect(divElement).not.toBeNull();

    mustHaveClasses.forEach(className => expect(divClasses).toContain(className));
  });

  it('should contain the "buy me a beer" link', () => {
    const anchorElement = compiled.querySelector('a') as HTMLAnchorElement;

    expect(anchorElement).not.toBeNull;
    expect(anchorElement?.title).toBe('Buy me a beer');

    expect(anchorElement?.href).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(anchorElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
  })
});
