import Logo from './../components/logo';

export default function(props){
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  return(
    <div>
      <Logo />
      <h3>您已经登陆成功，您的信息是：</h3>
      <p>用户名：{userInfo.user}</p>
      <p>类型：{userInfo.type}</p>
    </div>
  )
}
