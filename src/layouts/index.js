import Redirect from 'umi/redirect';

function BasicLayout(props) {
  if (localStorage.getItem('userInfo') != null){
    return (
      <div>
          { props.children }
      </div>
  )
  }
  return (
    <div>
      <Redirect to='/login' />
      { props.children }
    </div>
  )
}

export default BasicLayout;
