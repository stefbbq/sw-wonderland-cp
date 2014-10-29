<div class="site-header">
	<?php
		$home_url = 'http://bach/wonderland';
	?>
    <nav class="nav-top desktop">
        <div class="bucket-wrapper">
            <div class="left">
                <div class="logo">
                    <a href="<?php echo $home_url; ?>" class="filled-link home-link"></a>
                </div>
                <div class="wordmark">
                    <a href="<?php echo $home_url; ?>" class="filled-link home-link"></a>
                </div>
                <div class="hamburger social-icon"></div>
                <div class="clear"></div>
                <!-- <a href="{site_url}" class="filled-link home-link"></a> -->
            </div>
            <ul>
            	<?php
            		$menu = array(
            			'about us' => $home_url.'/#about-us',
            			'request a quote' => $home_url.'/#request-quote',
            			'services' => $home_url.'/#services',
            			'products' => $home_url.'/#products',
            			'faq' => $home_url.'/#faq',
            			'contact' => $home_url.'/#contact',
            			'client center' => $home_url.'-cp',
            			'blog' => $home_url
            			);
            		foreach($menu as $key => $value) {
            	?>
                <li class="<?php if($key == 'client center') {echo 'current';} ?>">
                    <a><?php echo $key; ?></a>
                    <a class="filled-link" href="<?php echo $value; ?>"></a>
                </li>
            	<?php
            		}
            	?>
            </ul>
            <div class="clear"></div>
        </div><!-- end .bucket-wrapper -->
        
    </nav><!-- end .nav-top -->
</div><!-- end .site-header -->