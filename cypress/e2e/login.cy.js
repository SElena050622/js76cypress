describe('Nav Menus', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1280, 720)
      cy.visit('/')
    })

    it('displays full header', () => {
      cy.get('nav .desktop-menu').should('be.visible')
      cy.get('nav .mobile-menu').should('not.be.visible')
    })
  })

  context('iphone-5 resolution', () => {
    beforeEach(() => {
      // run these tests as if in a mobile browser
      // and ensure our responsive UI is correct
      cy.viewport('iphone-5')
      cy.visit('/')
    })
    it('displays mobile menu on click', () => {
      cy.get('nav .desktop-menu').should('not.be.visible')
      cy.get('nav .mobile-menu')
        .should('be.visible')
        .find('i.hamburger').click()

      cy.get('ul.slideout-menu').should('be.visible')
    })
  })
})
  
describe('login process', () => {

  beforeEach(() => {
    cy.visit('/')    
  })

  it('test about not login', () => {
    cy.login(null, 'test')

    cy.get('#mail')
      .then((elements) => elements[0].checkValidity())
      .should('be.false')

    cy.get('#mail')
    .then((elements) => elements[0].validationMessage)
    .should('contain', 'Заполните это поле')
  })

  it('test about invalidmail', () => {
    cy.login('bagbag', 'test')

    cy.get('#mail')
      .then((elements) => elements[0].checkValidity())
      .should('be.false')

    cy.get('#mail')
    .then((elements) => elements[0].validationMessage)
    .should('contain', 'Адрес электронной почты должен содержать символ "@". В адресе "bagbag" отсутствует символ "@".')
  })

  it('test about login user', () => {
    cy.login('test@test.com', 'test')
            
    cy.contains('Добро пожаловать test@test.com').should('be.visible')

    cy.contains('Add new').click()
    cy.contains('Book description').should('be.visible')    
    cy.get('#title').type("Alisa")
    cy.contains('Submit').click()
    cy.contains('Alisa').should('be.visible')
    

    cy.contains('Add new').click()
    cy.contains('Book description').should('be.visible')
    cy.get('#title').type("Garry Potter")
    cy.contains('Submit').click()
    cy.contains('Garry Potter').should('be.visible')

    cy.contains('Books list').click()
    cy.contains('Alisa').should('be.visible')
    cy.contains('Garry Potter').should('be.visible')    

    cy.contains('Favorites').click()
    cy.contains('Please add some book to favorit on home page!').should('be.visible')    
  })
  
  /*it('test about Add to favorite', () => {
    if(cy.contains('Alisa').should('be.visible')) {
      cy.contains('Add to favorite').click()
      cy.contains('Delete from favorite').should('be.visible')
    }
  }) */
})