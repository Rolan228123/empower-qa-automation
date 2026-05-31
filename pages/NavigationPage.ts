import { BasePage } from "./BasePage";

export class NavigationPage extends BasePage {

  // Page Locators:
  public readonly logo = this.locator("img[alt*='home'], img[alt*='Empower'], img[alt*='logo']").first();
  public readonly loginLink        = this.locator("(//span[@class='z-10'])[1]");
  public readonly openAccountLink  = this.locator("text=Open an account").first();
  public readonly navProductsBtn   = this.locator("text=Products").first();
  public readonly navToolsBtn      = this.locator("text=Tools").first();
  public readonly navLearnBtn      = this.locator("text=Learn").first();
  public readonly navWhyEmpowerBtn = this.locator("text=Why Empower").first();



  // Page Actions:
  public async clickLogin() {
    await this.loginLink.click();
  }

  public async clickOpenAccount() {
    await this.openAccountLink.click();
  }

}
