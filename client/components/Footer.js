import React from 'react';

const Footer = (props) => {
  let { styles } = props;

  return (
    <footer className={styles}>
      <section className='flex items-center box-border h-full w-11/12 m-auto border-t-2'>
        <p className='text-sm tracking-wide text-left'>
          © 2021 Libiam. All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
