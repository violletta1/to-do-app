const {test, expect } = require('@playwright/test');



test('user can add a task', async ({page}) => {

    // Navigate to the To-Do app
    await page.goto('http://localhost:5500/');

    // Fill the task input with 'Test Task'
    await page.fill('#task-input', 'Test Task');

    // Click the [Add Task] button
    await page.click('#add-task');

    // Get the text content of the first .task element
    const taskText = await page.textContent('.task');

    // Assertion to check that the task text includes 'Test Task'
    expect(taskText).toContain('Test Task');

});

test('user can delete a task', async ({page}) => {
    //add
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    //delete
    await page.click('.task .delete-task');

    const tasks = await page.$$eval('.task',
    tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');

});

test('user can complete a task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    await page.click('.task .task-complete');


    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
});


test('user can filter task', async ({page}) => {

    await page.goto('http://localhost:5500/');
    await page.fill('#task-input','Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'Completed');

    const incompleteTask = await page.$('.task:not(.completed)');
    expect(incompleteTask).toBeNull();

});
