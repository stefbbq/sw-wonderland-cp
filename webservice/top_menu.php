<div class="site-header">
	<?php
		$home_url = 'http://wonderland.stagebot.net';
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
            </div><!-- end .left -->

            <div class="right">

                <ul>
                    <?php
                        $menu = array(
                            'about us' => $home_url.'/#about-us',
                            'request a quote' => $home_url.'/#request-quote',
                            'services' => $home_url.'/#services',
                            'products' => $home_url.'/#products',
                            'faq' => $home_url.'/#faq',
                            'contact' => $home_url.'/#contact',
                            'client center login' => 'http://wonderland-cp.stagebot.net/client/'
                            );
                        foreach($menu as $key => $value) {
                    ?>
                    <li class="<?php if($key == 'client center login') {echo 'current';} ?>">
                        <a><?php echo $key; ?></a>
                        <a class="filled-link" href="<?php echo $value; ?>"></a>
                    </li>
                    <?php
                        }
                    ?>
                </ul><!-- end ul -->
                <div class="clear"></div>

                <ul class="subnav">
                    <div class="underlay"><div class="nav-flag"></div></div>
                    <li>
                        <a>Newsletter Signup</a>
                        <a class="filled-link" href="<?php echo $home_url; ?>/#contact"></a>
                    </li>
                    <li>
                        <a>Upload A File</a>
                        <a class="filled-link" href="<?php echo $home_url; ?>/#request-a-quote"></a>
                    </li>
                </ul><!-- end .subnav -->
                <div class="clear"></div>

            </div><!-- end .right -->
            <div class="clear"></div>

        </div><!-- end .bucket-wrapper -->
        
    </nav><!-- end .nav-top -->
</div><!-- end .site-header -->

<script>
    $(document).ready(function() {
        $(".nav-top .hamburger").click(function() {
            $('.nav-top ul').toggleClass('expand');
        });
    });
</script>