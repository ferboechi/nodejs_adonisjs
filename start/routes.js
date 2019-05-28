'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgetPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgetPasswordController.update').validator(
  'ResetPassword'
)

Route.group(() => {
  Route.get('/files/:id', 'FileController.show')
  Route.post('/files', 'FileController.store')
  Route.resource('projects', 'ProjectController')
    .validator(new Map([[['project.store'], ['Project']]]))
    .apiOnly()
  Route.resource('projects.tasks', 'TaskController')
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
    .apiOnly()
}).middleware(['auth'])
