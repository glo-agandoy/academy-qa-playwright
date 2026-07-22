import { JSHandle, Locator, Page } from '@playwright/test';

/**
 * An abstract base class providing utility methods for interacting with a Playwright Page.
 *
 * This class encapsulates navigation, element interaction, waiting conditions, and helper functions,
 * aiming to standardize and simplify automation flows across different pages.
 */
export abstract class BasePage {
    /**
     * The Playwright Page instance associated with this class.
     */
    readonly page: Page;

    /**
     * Constructs an instance of PageBase.
     * @param page - A Playwright Page object representing the browser page.
     */
    constructor(page: Page) {
        this.page = page;
    }

    // -------------------------------
    // Navigation
    // -------------------------------

    /**
     * Navigates the current page to a URL and waits for the network to be idle.
     * @param url - The URL to navigate to.
     * @param page - The Playwright Page object to perform navigation on (optional).
     * @returns A promise that resolves once navigation is complete.
     */
    async goto(url: string, page?: Page): Promise<void> {
        const targetPage = page || this.page;
        await targetPage.goto(url, { waitUntil: 'load' });
    }

    /**
     * Navigates to a specified URL in the current or new tab.
     * @param url - The URL of the page to navigate to.
     * @param openInNewTab - If true, opens in a new tab; otherwise, in the current tab.
     * @returns A promise that resolves to an array of pages in the current browser context.
     */
    protected async navigate(url: string, openInNewTab: boolean): Promise<Page[]> {
        if (!url) throw new Error('URL is not defined.');

        if (openInNewTab) await this.goto(url, await this.page.context().newPage());

        if (!openInNewTab) await this.goto(url, this.page);

        return this.page.context().pages();
    }

    /**
     * Brings the current page to the foreground.
     * @returns A promise that resolves once the tab is active.
     */
    protected async switchToTab(): Promise<void> {
        await this.page.bringToFront();
    }

    /**
     * Reloads the current page and waits for the network to be idle.
     * @returns A promise that resolves once reload is complete.
     */
    public async reload(): Promise<void> {
        await this.page.reload({ waitUntil: 'networkidle' });
    }

    // -------------------------------
    // Locators & Elements
    // -------------------------------

    /**
     * Presses the Enter key.
     * @returns A promise that resolves once the key is pressed.
     */
    protected async pressEnter(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

    /**
     * Returns a Locator for the given CSS selector.
     * @param selector - The CSS selector to locate.
     * @returns A Locator object.
     */
    protected locator(selector: string): Locator {
        if (!selector) throw new Error('Locator is not defined');

        return this.page.locator(selector);
    }

    /**
     * Returns a Locator for the given XPath.
     * @param xpath - The XPath expression.
     * @returns A Locator object.
     */
    protected xpath(xpath: string): Locator {
        return this.locator(`xpath=${xpath}`);
    }

    /**
     * Returns a Locator for a selector that includes specific text.
     * @param selector - The CSS selector.
     * @param text - The text the element should contain.
     * @returns A Locator object.
     */
    protected locatorByText(selector: string, text: string): Locator {
        return this.page.locator(selector, { hasText: text });
    }

    /**
     * Returns the first combobox element.
     * @returns A Locator object for the combobox.
     */
    protected getComboBox(): Locator {
        return this.page.getByRole('combobox');
    }

    /**
     * Returns a button by its accessible name.
     * @param name - The button's accessible name.
     * @returns A Locator object.
     */
    protected getButtonByName(name: string): Locator {
        return this.page.getByRole('button', { name });
    }

    /**
     * Returns a textbox element.
     * @returns A Locator object for a textbox.
     */
    protected getTextBox(): Locator {
        return this.page.getByRole('textbox');
    }

    // -------------------------------
    // Actions
    // -------------------------------

    /**
     * Clicks a locator with an optional delay and force option.
     * @param locator - The element to click.
     * @param delay - Optional delay in ms.
     * @param force - Whether to force the click. Default is true.
     * @returns A promise that resolves when the click is complete.
     */
    protected async click(locator: Locator, delay = 0, force = false): Promise<void> {
        await locator.click({ delay, force });
    }

    /**
     * Dispatches a click event directly.
     * @param locator - The element to dispatch the event on.
     * @returns A promise that resolves once dispatched.
     */
    protected async dispatchClick(locator: Locator): Promise<void> {
        await locator.dispatchEvent('click');
    }

    /**
     * Fills the input field with the given value.
     * @param locator - The input element.
     * @param value - The value to fill.
     * @returns A promise that resolves once filled.
     */
    protected async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    /**
     * Types text one character at a time with a delay.
     * @param locator - The input element.
     * @param value - The text to type.
     * @returns A promise that resolves after typing.
     */
    protected async pressSequentially(locator: Locator, value: string): Promise<void> {
        await locator.pressSequentially(value, { delay: 100 });
    }

    /**
     * Selects an option in a dropdown.
     * @param locator - The select element.
     * @param option - The value of the option to select.
     * @returns A promise that resolves after selection.
     */
    protected async select(locator: Locator, option: string): Promise<void> {
        await locator.selectOption(option, { timeout: 100 });
    }

    // -------------------------------
    // Waits
    // -------------------------------

    /**
     * Waits for network to be idle.
     * @returns A promise that resolves when the page is idle.
     */
    public async waitForLoadState(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    /**
     * Waits for a selector to become visible.
     * @param selector - The CSS selector.
     * @returns A promise that resolves once visible.
     */
    protected async waitSelectorAreVisible(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }

    /**
     * Waits for a selector to be attached to the DOM.
     * @param selector - The CSS selector.
     * @returns A promise that resolves once attached.
     */
    protected async waitSelectorAreAttached(selector: string): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'attached' });
    }

    /**
     * Waits for a locator to become visible.
     * @param locator - The locator to wait on.
     * @returns A promise that resolves once visible.
     */
    protected async waitForLocatorAreVisible(locator: Locator): Promise<void> {
        await locator.waitFor();
    }

    /**
     * Waits for a locator to be attached to the DOM.
     * @param locator - The locator to wait on.
     * @returns A promise that resolves once attached.
     */
    protected async waitForLocatorAreAttached(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'attached' });
    }

    /**
     * Waits for the text content of an element to exceed a threshold.
     * @param selector - The CSS selector.
     * @param greaterThan - The number to exceed.
     * @returns A JSHandle that resolves to true if condition is met.
     */
    protected async waitUntilTextContentIsGreaterThan(selector: string, greaterThan: number): Promise<JSHandle<boolean>> {
        return await this.page.waitForFunction(
            ({ sel, greater }) => {
                const el = document.querySelector(sel);
                const val = parseInt(el?.textContent?.trim() ?? '', 10);
                return !isNaN(val) && val > greater;
            },
            { sel: selector, greater: greaterThan }
        );
    }

    /**
     * Waits until the text content of a selector equals a value.
     * @param selector - The CSS selector.
     * @param text - The expected text.
     * @returns A promise resolving to true if matched, otherwise false.
     */
    protected async waitUntilTextChange(selector: string, text: string): Promise<JSHandle<boolean> | boolean> {
        try {
            return await this.page.waitForFunction(
                ({ sel, txt }) => {
                    const element = document.querySelector(sel);
                    return element?.textContent?.trim() === txt;
                },
                { sel: selector, txt: text }
            );
        } catch {
            return false;
        }
    }

    /**
     * Waits for a specified timeout.
     * @param timeout - Time in ms to wait. Default is 1000ms.
     * @returns A promise that resolves after timeout.
     */
    protected async waitTimeOut(timeout = 100): Promise<void> {
        await this.page.waitForTimeout(timeout);
    }

    /**
     * Waits for a locator to disappear from the DOM.
     * @param locator - The locator to wait on.
     * @returns A promise that resolves when the element is detached.
     */
    protected async waitUntilLocatorDisappear(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'detached' });
    }

    // -------------------------------
    // Helpers
    // -------------------------------

    /**
     * Returns all matching Locator objects.
     * @param locator - A selector or Locator.
     * @returns An array of Locator objects.
     */
    protected async all(locator: string | Locator): Promise<Locator[]> {
        return typeof locator === 'string' ? await this.locator(locator).all() : await locator.all();
    }

    /**
     * Returns the inner texts of all matched elements.
     * @param selector - The CSS selector.
     * @returns An array of inner texts.
     */
    protected async allInnerTexts(selector: string): Promise<string[]> {
        return await this.locator(selector).allInnerTexts();
    }

    /**
     * Gets the inner text of a locator.
     * @param locator - The Locator object.
     * @returns The inner text of the element.
     */
    protected async innerText(locator: Locator): Promise<string> {
        return await locator.innerText();
    }

    /**
     * Gets the text content of a locator.
     * @param locator - The Locator object.
     * @returns The text content or null.
     */
    protected async textContent(locator: Locator): Promise<string | null> {
        return await locator.textContent();
    }

    /**
     * Waits for a download event.
     * @returns A promise that resolves on download start.
     */
    protected async waitForDownload(): Promise<void> {
        await this.page.waitForEvent('download');
    }

    /**
     * Waits for a popup page event.
     * @returns A promise that resolves to the new popup page.
     */
    protected async waitForPopUp(): Promise<Page> {
        return await this.page.waitForEvent('popup');
    }

    /**
     * Checks whether a locator exists in the DOM.
     * @param locator - The Locator object.
     * @returns True if element is present.
     */
    protected async isPresent(locator: Locator): Promise<boolean> {
        return (await locator.count()) > 0;
    }

    /**
     * Checks whether a locator is disabled.
     * @param locator - The Locator object.
     * @returns True if disabled.
     */
    protected async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}
