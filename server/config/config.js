var env=process.env.Node_ENV||'development';
console.log('env----->',env);
if(env==='development')
{  console.log('---------in develop db----------- ');
 process.env.PORT=3000;
 process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoApp'
}
if(env==='test')
{  console.log('---------in test db----------- ');
  process.env.PORT=3000;
 process.env.MONGODB_URI= 'mongodb://localhost:27017/TodoAppTest'
   
}

