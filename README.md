## Steps to configure Optimizely and Segment with website

1. Install [Optimizely PHP SDK](https://docs.developers.optimizely.com/full-stack/docs/php)

```php
composer require optimizely/optimizely-sdk
```

2. Instantiate Optimizely (globally)

```php
use Optimizely\OptimizelyFactory;

$sdkKey = "Lgk3PUSJP9zSH8P4tgDQN";

$optimizelyClient = OptimizelyFactory::createDefaultInstance($sdkKey);
```

3. Make a HTTP GET request to the following URL when the user logs in, and the userId is received (Example: `PIXabcdef1234567ghijkl`). Pass the userId as `userId` in the URL.

```php
URL: "https://28gvj3sukd.execute-api.eu-west-1.amazonaws.com/v1/traits?spaceId=spa_6hBMMLUDfDLyScqVavM6rm&businessUnit=printdeal&userId=" + userId
Method: GET
Headers: {
    "Content-Type": "application/json",
    "x-api-key": "EMTp96P0H745dJnaFju8U5kDG6kduQAr9HN6k1km",
}
```

4. Store the response data somewhere (cookies / localstorage)
5. In the code where Promo Banner is shown (refer Use Case 1 image), add the following:

```php
$enabled = $optimizelyClient->isFeatureEnabled('new-user-promo-banner', 'PIXabcdef1234567ghijkl', $attributes);
// here $attributes is the response.traits object from above HTTP call

if ($enabled) {
  $newUser = $optimizelyClient->getFeatureVariableBoolean('new-user-promo-banner', 'new-user', 'PIXabcdef1234567ghijkl', $attributes);
  $contentfulReferenceId = $optimizelyClient->getFeatureVariableString('new-user-promo-banner', 'contentfulReferenceId', $userId, $attributes);

  if($newUser){
      // show promo banner for new users...
  } else{
      // show normal banner for all users...
  }
} else {
  // show normal banner for all users...
}
```

6. Similarly, in the code where carousel is shown (refer Use Case 2 image), add the following:

```php
$enabled = $optimizelyClient->isFeatureEnabled('test-offer', 'PIXabcdef1234567ghijkl', $attributes);
// here $attributes is the response.traits object from above HTTP call

if ($enabled) {
  $discount = $optimizelyClient->getFeatureVariableInteger('test-offer', 'amount', 'PIXabcdef1234567ghijkl', $attributes);
  // $discount is an integer
  // instead of 15% off in the image, show the $discount as offer: $discount% off

} else {
  // show normal carousel for all users...
}

```

7. Finally, add the following when the user clicks on the above banner / carousel (click event listener):

```php
$user = $optimizelyClient->createUserContext('PIXabcdef1234567ghijkl', $attributes);
$user->trackEvent('test-event-entered');
```

> Note: Here `PIXabcdef1234567ghijkl` is assumed to be the customer number received when the user logs in to the website, and `$attributes` is assumed to be `traits` object from HTTP response.
