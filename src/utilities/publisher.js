function Publisher() {
  let publishing = false;
  const subscribers = [];

  function subscribe(subscriber) {
    if (publishing) {
      throw new Error('Publisher is publishing. You cannot subscribe to a publisher in the middle of a publication.');
    }

    if (typeof subscriber !== 'function') {
      throw new Error('Subscriber is not a function. Publishers expect subscribers to be functions.');
    }

    let subscribed = subscribers.indexOf(subscriber) !== -1;

    if (!subscribed) {
      subscribers.push(subscriber);
      subscribed = true;
    }

    const unsubscribe = () => {
      if (publishing) {
        throw new Error(
          'Publisher is publishing. You cannot unsubscribe from a publisher in the middle of a publication.'
        );
      }

      if (subscribed) {
        const index = subscribers.indexOf(subscriber);
        subscribers.splice(index, 1);
        subscribed = false;
      }
    };

    return unsubscribe;
  }

  function publish(...args) {
    publishing = true;

    try {
      for (var index = 0; index < subscribers.length; index++) {
        const subscriber = subscribers[index];
        subscriber(...args);
      }
    } catch (error) {
      publishing = false;
      throw error;
    }

    publishing = false;
  }

  return { subscribe, publish };
}

export default Publisher;
